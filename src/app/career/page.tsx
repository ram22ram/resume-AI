import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Lightbulb } from "lucide-react";

export default function CareerPage() {
  const roles = [
    {
      title: "AI / Machine Learning Engineer",
      why: "Fastest growing role in tech",
      skills: ["Python", "TensorFlow/PyTorch", "Mathematics", "Deep Learning"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
    {
      title: "Data Analyst / Data Scientist",
      why: "Data-driven companies demand analysts",
      skills: ["SQL", "Data Visualization", "Statistics", "Python/R"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
    {
      title: "Cybersecurity Analyst",
      why: "Cyber threats increasing",
      skills: ["Network Security", "Ethical Hacking", "Risk Management", "SIEM"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
    {
      title: "Full Stack Developer",
      why: "Core role in SaaS",
      skills: ["React/Next.js", "Node.js", "Databases", "API Design"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
    {
      title: "Cloud / DevOps Engineer",
      why: "Cloud demand growing",
      skills: ["AWS/Azure/GCP", "Docker", "Kubernetes", "CI/CD"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
    {
      title: "Prompt Engineer / GenAI Specialist",
      why: "New high-paying role",
      skills: ["LLM Prompting", "Python", "LangChain", "Vector Databases"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
    {
      title: "Digital Marketing Specialist",
      why: "Businesses going online",
      skills: ["SEO", "Social Media", "Ads", "Content Marketing"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
    {
      title: "Product Manager",
      why: "High-paying tech + business role",
      skills: ["Product thinking", "Market research", "Communication", "Agile"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
    {
      title: "UI/UX Designer",
      why: "Essential for product success",
      skills: ["Figma", "Wireframing", "UX research", "Prototyping"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
    {
      title: "Business Analyst",
      why: "Bridge between business & tech",
      skills: ["Data analysis", "Excel/SQL", "Communication", "Problem Solving"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
    {
      title: "HR / Talent Acquisition",
      why: "Hiring demand growing",
      skills: ["Recruitment", "Communication", "Interviewing", "Networking"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
    {
      title: "Content Creator",
      why: "Creator economy growing",
      skills: ["Content creation", "Branding", "Social media", "Storytelling"],
      courses: ["LinkedIn", "Udemy", "YouTube"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Career Explorer
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover high-demand roles, master essential skills, and find the best resources to launch your career.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {roles.map((role, i) => (
          <Card key={i} className="flex flex-col group hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <TrendingUp className="size-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Trending Path</span>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">{role.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="mb-6">
                <div className="flex items-start gap-2 mb-2">
                  <Lightbulb className="size-4 text-amber-500 mt-1 shrink-0" />
                  <p className="text-sm font-medium">{role.why}</p>
                </div>
              </div>
              
              <div className="mb-6 flex-1">
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 tracking-widest flex items-center gap-2">
                  Skills Required
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill, si) => (
                    <Badge key={si} variant="secondary" className="bg-secondary/50 text-[11px] font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 border-t border-border/50">
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 tracking-widest flex items-center gap-2">
                  Recommended Courses
                </h4>
                <div className="flex gap-4">
                  {role.courses.map((course, ci) => (
                    <span key={ci} className="text-sm font-medium text-primary hover:underline cursor-pointer flex items-center gap-1">
                      <BookOpen className="size-3 text-muted-foreground" />
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20 p-8 md:p-12 bg-primary/5 rounded-3xl border border-primary/10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Want a Personalized Career Path?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
          Our AI can analyze your skills and suggest the perfect roadmap for your dream role.
        </p>
        <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:scale-105 transition-transform">
          Unlock My Roadmap
        </button>
      </div>
    </div>
  );
}
