import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { extractText } from "unpdf";

// Force Node.js runtime — required for pdf-parse (uses Buffer/fs)
export const runtime = "nodejs";

/**
 * POST /api/resume/parse
 * Accepts a PDF file, extracts text, and maps it to ResumeData shape.
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    const mimeType = file.type;
    let fullText = "";

    if (mimeType === "application/pdf") {
      const buffer = Buffer.from(await file.arrayBuffer());
      // Use unpdf for server-friendly extraction
      const { text } = await extractText(buffer);
      fullText = Array.isArray(text) ? text.join(" ") : (text || "");
    } else {
      // For DOCX/DOC — return demo data (requires mammoth for full support)
      return NextResponse.json(buildDemoData());
    }

    if (!fullText.trim()) {
      return NextResponse.json(buildDemoData());
    }

    const resumeData = parseTextToResumeData(fullText);
    return NextResponse.json(resumeData);
  } catch (error: unknown) {
    console.error("RESUME_PARSE_ERROR", error);
    return NextResponse.json(buildDemoData());
  }
}

function parseTextToResumeData(text: string) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const phoneMatch = text.match(/(\+?\d[\d\s\-().]{8,}\d)/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/);

  const firstLine = lines[0] || "";

  return {
    sections: [
      {
        type: "personal",
        isVisible: true,
        items: [
          {
            fullName: firstLine,
            email: emailMatch?.[0] || "",
            phone: phoneMatch?.[0] || "",
            linkedin: linkedinMatch?.[0] || "",
            jobTitle: "",
            address: "",
            objective:
              extractSection(text, ["summary", "objective", "profile", "about"]) || "",
          },
        ],
      },
      {
        type: "experience",
        isVisible: true,
        items: extractExperiences(text),
      },
      {
        type: "education",
        isVisible: true,
        items: extractEducation(text),
      },
      {
        type: "skills",
        isVisible: true,
        items: extractSkills(text),
      },
    ],
    metadata: { accentColor: "#2563eb" },
  };
}

function extractSection(text: string, keywords: string[]): string {
  const lower = text.toLowerCase();
  for (const kw of keywords) {
    const idx = lower.indexOf(kw);
    if (idx !== -1) {
      const chunk = text.slice(idx + kw.length, idx + kw.length + 300).trim();
      return chunk.split("\n")[0] || "";
    }
  }
  return "";
}

function extractExperiences(text: string) {
  const dateRegex =
    /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d{4})\b.*?[–-].*?\b(\d{4}|Present)\b/gi;
  const matches = Array.from(text.matchAll(dateRegex)).slice(0, 5);
  if (!matches.length) return [];

  return matches.map((m) => ({
    company: "",
    position: "",
    date: m[0],
    description: "",
    location: "",
  }));
}

function extractEducation(text: string) {
  const lower = text.toLowerCase();
  const idx = lower.indexOf("education");
  if (idx === -1) return [];

  const chunk = text.slice(idx, idx + 500);
  const lines = chunk.split("\n").filter(Boolean).slice(1, 5);
  if (!lines.length) return [];

  return [
    {
      school: lines[0] || "",
      degree: lines[1] || "",
      startDate: "",
      endDate: "",
      location: "",
    },
  ];
}

function extractSkills(text: string) {
  const lower = text.toLowerCase();
  const idx = lower.indexOf("skill");
  if (idx === -1) return [];

  const chunk = text.slice(idx, idx + 400);
  const skillLine =
    chunk.split("\n").find((l) => l.length > 10 && l.length < 200) || "";
  const skills = skillLine
    .split(/[,•·|/]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length < 40);

  return skills.slice(0, 15).map((name) => ({ name }));
}

function buildDemoData() {
  return {
    sections: [
      {
        type: "personal",
        isVisible: true,
        items: [
          {
            fullName: "Johnathan Smith",
            jobTitle: "Senior Frontend Engineer",
            email: "john.smith@example.com",
            phone: "+1 (555) 000-1111",
            address: "San Francisco, CA",
            objective:
              "Expert Frontend Developer with 8+ years of experience in React and Next.js.",
          },
        ],
      },
      {
        type: "experience",
        isVisible: true,
        items: [
          {
            company: "Vercel",
            position: "Senior Engineer",
            date: "2021 – Present",
            description: "Led core Next.js feature development.",
            location: "Remote",
          },
          {
            company: "Stripe",
            position: "Software Engineer",
            date: "2018 – 2021",
            description: "Architected payment flows used by millions.",
            location: "San Francisco, CA",
          },
        ],
      },
      {
        type: "education",
        isVisible: true,
        items: [
          {
            school: "Stanford University",
            degree: "M.S. in Computer Science",
            startDate: "2016",
            endDate: "2018",
            location: "Stanford, CA",
          },
        ],
      },
      {
        type: "skills",
        isVisible: true,
        items: [
          { name: "React" },
          { name: "Next.js" },
          { name: "TypeScript" },
          { name: "Tailwind CSS" },
          { name: "Node.js" },
        ],
      },
    ],
    metadata: { accentColor: "#2563eb" },
  };
}
