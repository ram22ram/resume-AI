import { Metadata } from "next";
import { ALL_TEMPLATES } from "@/components/templates/registry";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import Image from "next/image";

interface Props {
  params: { slug: string };
}

const SEO_NICHES: Record<string, any> = {
  "software-engineer-resume-template": {
    title: "Software Engineer Resume Template",
    description: "Build a high-performance software engineer resume with our ATS-optimized templates. Proven to land interviews at FAANG.",
    h1: "Engineered for Tech Excellence",
    content: "Our software engineering templates focus on technical stacks, project impact, and problem-solving skills.",
    keywords: ["react", "node", "system design", "algorithms"],
  },
  "resume-templates-for-freshers": {
    title: "Resume Templates for Freshers",
    description: "Kickstart your career with professional resume templates for freshers. No experience? No problem.",
    h1: "Start Your Career with Confidence",
    content: "Designed for students and entry-level professionals to highlight education, internships, and potential.",
    keywords: ["entry level", "student resume", "first job"],
  },
  "ats-friendly-resume-format": {
    title: "ATS Friendly Resume Format",
    description: "Get past the bots with our 100% ATS-friendly resume formats. 99% success rate in scanning systems.",
    h1: "Be Seen by Humans, Not Bots",
    content: "Clean, parseable layouts that ensure your resume reaches the hiring manager's desk.",
    keywords: ["ats optimized", "bot friendly", "parsing"],
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const niche = SEO_NICHES[params.slug];
  if (!niche) return { title: "Resume Template | ResumeAI" };

  return {
    title: `${niche.title} | ResumeAI`,
    description: niche.description,
    openGraph: {
      title: niche.title,
      description: niche.description,
      type: "website",
    },
  };
}

export default function SeoLandingPage({ params }: Props) {
  const niche = SEO_NICHES[params.slug];
  
  if (!niche) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-black">404</h1>
        <p className="text-muted-foreground">Template collection not found.</p>
        <Button asChild className="mt-4 rounded-xl">
           <Link href="/templates">View All Templates</Link>
        </Button>
      </div>
    );
  }

  const featuredTemplates = ALL_TEMPLATES.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)]" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 animate-fade-in">
             <Star className="size-3 fill-current" />
             Top Rated for 2026
          </div>
          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
            {niche.h1}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {niche.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="rounded-2xl h-14 px-10 text-lg font-black shadow-2xl shadow-primary/30" asChild>
               <Link href="/resume/new">Build Your Resume Now <ArrowRight className="ml-2 size-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl h-14 px-10 text-lg font-black border-2" asChild>
               <Link href="/templates">Browse All</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-black tracking-tight mb-4">Recommended Templates</h2>
             <p className="text-muted-foreground font-medium">Specifically curated for {niche.title.toLowerCase()}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTemplates.map((template) => (
              <div key={template.id} className="group bg-background rounded-[2.5rem] p-4 border border-muted-foreground/10 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl">
                 <div className="aspect-[3/4] bg-muted rounded-[2rem] mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/40 backdrop-blur-sm">
                       <Button className="rounded-xl font-black" asChild>
                          <Link href={`/resume/new?template=${template.id}`}>Use This Template</Link>
                       </Button>
                    </div>
                 </div>
                 <div className="px-4 pb-4">
                    <h3 className="text-xl font-black mb-1">{template.name}</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                       {template.isPremium ? "Premium" : "Free"} Template
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-muted-foreground/5">
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-black tracking-tight mb-8">Why Choose our {niche.title}?</h2>
            <div className="grid gap-6">
               {[
                 "Industry-standard layouts optimized for recruiter scanning",
                 "Tested against modern Applicant Tracking Systems (ATS)",
                 "Easily customizable with our live drag-and-drop editor",
                 "Download in professional, print-ready PDF format",
                 "Expert guidance and real-time score optimization"
               ].map((benefit, i) => (
                 <div key={i} className="flex items-start gap-4">
                    <div className="p-1 bg-green-500/10 rounded-full mt-1">
                       <CheckCircle2 className="size-5 text-green-500" />
                    </div>
                    <p className="text-lg font-medium text-muted-foreground">{benefit}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
      
      <footer className="py-20 bg-primary text-white text-center">
         <h2 className="text-4xl font-black mb-8">Ready to get hired?</h2>
         <Button size="lg" variant="secondary" className="rounded-2xl h-16 px-12 text-xl font-black shadow-2xl" asChild>
            <Link href="/resume/new">Create Your {niche.title} <ArrowRight className="ml-2" /></Link>
         </Button>
      </footer>
    </div>
  );
}
