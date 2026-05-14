import { CoverLetterData } from "@/types/cover-letter";

export const MOCK_COVER_LETTER_DATA: CoverLetterData = {
  personalInfo: {
    fullName: "Aryan Sharma",
    email: "aryan.sharma@example.com",
    phone: "+91 98765 43210",
    address: "Bangalore, India",
    linkedin: "linkedin.com/in/aryansharma",
  },
  recipientInfo: {
    name: "Hiring Manager",
    role: "Engineering Manager",
    company: "Tech Giant Corp",
    address: "123 Tech Park, Silicon Valley, CA",
  },
  content: {
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    subject: "Application for Senior Frontend Engineer Position",
    body: `I am writing to express my strong interest in the Senior Frontend Engineer position at Tech Giant Corp, as advertised on your careers page. With over 5 years of experience in building scalable web applications and a deep passion for modern frontend technologies, I am confident that my skills and expertise make me an ideal candidate for this role.

In my current role as a Senior Frontend Developer at TechFlow Solutions, I have successfully led the development of several high-impact projects, including a flagship SaaS platform that serves over 50,000 active users. My expertise in React, Next.js, and TypeScript has allowed me to build performant, accessible, and maintainable user interfaces that drive business value.

What attracts me to Tech Giant Corp is your commitment to innovation and your reputation for excellence in the tech industry. I am particularly impressed by your recent work on AI-driven analytics, and I am eager to contribute my technical skills and creative problem-solving abilities to your talented engineering team.

I have attached my resume for your review and look forward to the possibility of discussing how my background and experience align with the needs of Tech Giant Corp. Thank you for your time and consideration.`,
    closing: "Sincerely,",
  },
  metadata: {
    accentColor: "#2563eb",
  },
};
