import { ResumeData } from "@/types/resume";

export const MOCK_RESUME_DATA: ResumeData = {
  metadata: {
    accentColor: "#2563eb",
  },
  sections: [
    {
      type: "personal",
      isVisible: true,
      items: [
        {
          fullName: "Aryan Sharma",
          email: "aryan.sharma@example.com",
          phone: "+91 98765 43210",
          address: "Bangalore, India",
          linkedin: "linkedin.com/in/aryansharma",
          portfolio: "aryansharma.dev",
          jobTitle: "Senior Frontend Engineer",
          objective: "Dynamic Frontend Engineer with 4+ years of experience in building scalable web applications. Expert in React, Next.js, and performance optimization."
        }
      ]
    },
    {
      type: "summary",
      isVisible: true,
      items: [
        {
          description: "Experienced developer specializing in modern web technologies and user-centric design."
        }
      ]
    },
    {
      type: "experience",
      isVisible: true,
      items: [
        {
          company: "TechFlow Solutions",
          position: "Senior Frontend Developer",
          location: "Remote",
          date: "Jan 2022 - Present",
          description: [
            "Led the development of a flagship SaaS product using Next.js 14.",
            "Optimized page load times by 40% through code splitting.",
            "Mentored junior developers and established coding standards."
          ]
        },
        {
          company: "Innovate Digital",
          position: "Junior Web Developer",
          location: "Mumbai",
          date: "Jun 2019 - Dec 2021",
          description: [
            "Implemented responsive UI components using Tailwind CSS.",
            "Improved core dashboard performance by 25%.",
            "Fixed critical bugs and ensured cross-browser compatibility."
          ]
        }
      ]
    },
    {
      type: "education",
      isVisible: true,
      items: [
        {
          school: "Indian Institute of Technology (IIT)",
          degree: "B.Tech in Computer Science",
          location: "Mumbai",
          startDate: "2015",
          endDate: "2019"
        }
      ]
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
        { name: "System Design" }
      ]
    },
    {
      type: "projects",
      isVisible: true,
      items: [
        {
          title: "Resume-AI Platform",
          technologies: "Next.js, Prisma, Tailwind",
          description: ["Built an AI-powered resume builder with real-time preview."],
          startDate: "2023",
          endDate: "Present"
        }
      ]
    }
  ]
};
