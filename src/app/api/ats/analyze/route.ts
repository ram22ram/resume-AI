import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/db";
import pdf from "pdf-parse-fork";

// Force Node runtime (needed for pdf-parse)
export const runtime = "nodejs";

interface ATSResponse {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
  summary: string;
  cta: "login" | "upgrade" | null;
  isLimitReached: boolean;
}

/**
 * Extract semantic skills/entities from text using keyword extraction
 * Focuses on technical terms, tools, frameworks, soft skills
 */
function extractSemanticTerms(text: string): string[] {
  const commonTerms = text.match(/\b([a-z]+\+\+|[a-z]+#|java|python|typescript|javascript|react|node|sql|kubernetes|docker|aws|azure|gcp|git|ci\/cd|agile|scrum|devops|api|rest|graphql|microservices|cloud|machine learning|ai|data science|analytics|excel|powerpoint|communication|leadership|project management|problem solving)\b/gi) || [];
  return Array.from(new Set(commonTerms.map(t => t.toLowerCase())));
}

/**
 * Calculate advanced match score considering:
 * - Keyword density
 * - Semantic similarity
 * - Technical alignment
 */
function calculateAdvancedScore(
  resumeText: string,
  jobKeywords: string[],
  matchedWords: string[],
  semanticMatches: string[]
): number {
  const baseScore = jobKeywords.length ? (matchedWords.length / jobKeywords.length) * 70 : 0;
  const semanticBonus = Math.min(semanticMatches.length * 2, 30);
  return Math.min(Math.round(baseScore + semanticBonus), 100);
}

export async function POST(req: Request) {
  try {
    // ✅ ENV check
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY");
    }

    const formData = await req.formData();
    const file = formData.get("resume") as File;
    const jobDescription = formData.get("jobDescription") as string;

    if (!file || !jobDescription) {
      return new NextResponse(
        JSON.stringify({
          score: 0,
          matchedKeywords: [],
          missingKeywords: [],
          suggestions: ["Resume file and job description are required."],
          summary: "Missing input data",
          cta: null,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // ✅ Extract text using pdf-parse-fork (server-friendly)
    const pdfData = await pdf(buffer);
    const resumeText = pdfData.text.toLowerCase();
    const jdText = jobDescription.toLowerCase();

    // ✅ AUTH CHECK - Determine free vs pro user
    const session = await getServerSession(authOptions);
    const isLoggedIn = !!session?.user;
    let dbUser = null;

    if (isLoggedIn && session?.user?.email) {
      dbUser = await db.user.findUnique({
        where: { email: session.user.email },
      });
    }

    const isPro = dbUser?.plan === "pro";
    const scanCount = dbUser?.scanCount || 0;

    // ✅ Enhanced keyword extraction
    const stopWords = new Set([
      "and", "the", "with", "for", "from", "that", "this", "these", "those", "will", "shall",
      "a", "an", "or", "is", "are", "be", "been", "being", "have", "has", "had", "do", "does",
      "did", "should", "would", "could", "can", "must", "may", "might", "in", "on", "at",
      "by", "to", "of", "as", "if", "about", "into", "through", "during", "before", "after",
    ]);

    const jdWords = jdText
      .split(/\W+/)
      .filter((w: string) => w.length > 2 && !stopWords.has(w));

    const uniqueJdWords = Array.from(new Set(jdWords)) as string[];

    const matchedWords = uniqueJdWords.filter((word) =>
      resumeText.includes(word)
    );

    const missingWords = uniqueJdWords.filter(
      (word) => !resumeText.includes(word)
    );

    // Extract semantic/technical terms
    const semanticTermsInJD = extractSemanticTerms(jdText);
    const semanticTermsInResume = extractSemanticTerms(resumeText);
    const semanticMatches = semanticTermsInJD.filter(term =>
      semanticTermsInResume.includes(term)
    );

    // ✅ Calculate score (different for free vs pro)
    let score: number;
    if (isPro) {
      score = calculateAdvancedScore(
        resumeText,
        uniqueJdWords,
        matchedWords,
        semanticMatches
      );
    } else {
      // Free users get approximate score (less accurate)
      score = uniqueJdWords.length
        ? Math.round((matchedWords.length / uniqueJdWords.length) * 100)
        : 0;
      // Add randomness for free users (approximation)
      score = Math.max(0, Math.min(100, score + (Math.random() * 10 - 5)));
    }

    // ✅ Prepare response data
    let responseData: ATSResponse;

    // ✅ TIERED ACCESS LOGIC
    let isLimitReached = false;
    let limitMessage = "";
    let limitCta: "login" | "upgrade" | null = null;

    if (!isLoggedIn) {
      isLimitReached = true;
      limitMessage = "Sign up to see detailed keyword analysis and AI suggestions.";
      limitCta = "login";
    } else if (dbUser) {
      if (isPro && scanCount >= 3) {
        isLimitReached = true;
        limitMessage = "You have reached your Pro limit of 3 full analysis scans.";
        limitCta = null;
      } else if (!isPro && scanCount >= 1) {
        isLimitReached = true;
        limitMessage = "You have used your 1 free full analysis. Upgrade to Pro for more scans.";
        limitCta = "upgrade";
      } else {
        // Increment scan count for allowed full analysis
        await db.user.update({
          where: { id: dbUser.id },
          data: { scanCount: { increment: 1 } },
        });
      }
    }

    if (isLimitReached) {
      const basicSuggestions = [limitMessage];
      basicSuggestions.push("Check your resume for spelling, grammar, and basic formatting issues.");

      responseData = {
        score: Math.round(score / 10) * 10, // Round to nearest 10 for approximation
        matchedKeywords: [], // Hide matched/missing for limited results
        missingKeywords: [],
        suggestions: basicSuggestions,
        summary: !isLoggedIn ? "Sign up to see detailed insights." : "Scan limit reached. Showing basic results.",
        cta: limitCta,
        isLimitReached: true,
      };

      return NextResponse.json(responseData);
    }

    // ✅ FULL ANALYSIS (PRO & FREE BEFORE LIMIT)
    let aiData = {
      improvements: [] as string[],
      summary: "",
      missingSkills: [] as string[],
    };

    const suggestions: string[] = [];

    // Add keyword-based suggestions for all logged-in users
    if (score < 50) {
      suggestions.push(
        "Incorporate more technical keywords from the job description into your resume."
      );
    }

    if (resumeText.length < 800) {
      suggestions.push(
        "Expand your resume with more detailed achievements and quantifiable results."
      );
    }

    if (semanticMatches.length < semanticTermsInJD.length / 2) {
      suggestions.push(
        `Missing critical skills: ${semanticTermsInJD
          .slice(0, 3)
          .join(", ")}. Consider adding these.`
      );
    }

    // 🤖 AI-POWERED ANALYSIS (PRO USERS ONLY)
    if (isPro) {
      try {
        const genAI = new GoogleGenerativeAI(
          process.env.GEMINI_API_KEY
        );

        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });

        const prompt = `Analyze this resume against the job description and provide structured feedback.

Resume:
${resumeText.slice(0, 2000)}

Job Description:
${jdText.slice(0, 1500)}

Return ONLY valid JSON with no markdown:
{
  "improvements": ["specific actionable improvement 1", "improvement 2", "improvement 3"],
  "summary": "brief professional summary of alignment",
  "missingSkills": ["missing skill 1", "missing skill 2"]
}`;

        const aiRes = await model.generateContent(prompt);
        const aiText = aiRes.response.text();

        // Clean markdown code blocks if present
        const cleaned = aiText.replace(/```json|```/g, "").trim();

        try {
          aiData = JSON.parse(cleaned);
        } catch (parseErr) {
          console.log("Failed to parse AI response:", parseErr);
          aiData = {
            improvements: [],
            summary: "Could not generate detailed analysis",
            missingSkills: [],
          };
        }
      } catch (err) {
        console.log("AI_ANALYSIS_ERROR:", err);
        // Continue without AI data
      }
    }

    // ✅ BUILD FINAL RESPONSE
    responseData = {
      score,
      matchedKeywords: matchedWords.slice(0, isPro ? 15 : 3),
      missingKeywords: isPro ? missingWords.slice(0, 15) : [],
      suggestions: [
        ...suggestions.slice(0, isPro ? 10 : 2),
        ...(aiData.improvements || []).slice(0, isPro ? 5 : 0),
      ],
      summary: isPro
        ? aiData.summary || `Your resume matches ${score}% of the job requirements. ${semanticMatches.length > 0 ? `Key technical skills aligned: ${semanticMatches.slice(0, 3).join(", ")}.` : "Consider adding more technical keywords."}`
        : "Login to see detailed analysis.",
      cta: null,
      isLimitReached: false,
    };

    return NextResponse.json(responseData);
  } catch (error: unknown) {
    console.error("ATS_ANALYZE_ERROR", error);
    return NextResponse.json(
      {
        score: 0,
        matchedKeywords: [],
        missingKeywords: [],
        suggestions: ["An error occurred during analysis. Please try again."],
        summary: "Error processing resume",
        cta: null,
        isLimitReached: true,
      },
      { status: 500 }
    );
  }
}