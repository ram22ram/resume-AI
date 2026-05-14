"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";
import { TemplateCarousel } from "@/components/templates/template-carousel";
import { 
  CheckCircle2, 
  FileText, 
  Search, 
  Zap, 
  Layout, 
  Target, 
  Briefcase, 
  ArrowRight,
  Star,
  Quote
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function HomePage() {
  interface Job { id: string; title: string; company: string; location: string; applyUrl?: string; salary?: string; type?: string; [key: string]: unknown; }
  const [jobs, setJobs] = useState<Job[]>([]);


  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setJobs(data.data?.slice(0, 3) || []);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    }
    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium border-primary/20 bg-primary/5 text-primary">
              ✨ All-in-one Career Platform for India
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Build an <span className="text-primary">ATS-Optimized</span> Resume.<br />
              Get More Interviews.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Create resumes, check ATS score, and apply to jobs — all in one platform. 
              The fastest way to land your dream job in 2026.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/resume/new">
                <Button size="lg" className="px-10 py-7 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                  Build Resume Now
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
              <Link href="/templates/test">
                <Button size="lg" variant="outline" className="px-10 py-7 text-lg font-bold rounded-2xl hover:bg-muted/50 transition-colors">
                  View Templates
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-primary" />
                ATS-friendly templates
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-primary" />
                Real job listings
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-primary" />
                Built for India
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Template Showcase */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Choose from <span className="text-primary">Professional</span> Templates</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Designed by hiring managers to pass the 6-second recruiter test.
              Stand out from the competition with our industry-vetted layouts.
            </p>
          </motion.div>

          <TemplateCarousel type="resume" />

          <div className="text-center mt-12">
            <Link href="/templates/test">
              <Button size="lg" variant="ghost" className="font-bold text-primary group text-lg rounded-full px-8 py-6">
                Explore All Templates
                <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cover Letter Section */}
      <section className="py-24 bg-background overflow-hidden border-y">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm font-medium border-blue-500/20 bg-blue-500/5 text-blue-600">
              New: Cover Letter Builder
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Create <span className="text-blue-600">Professional</span> Cover Letters</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Pairs perfectly with your resume. Tell your story and make a lasting 
              impression with our professionally crafted cover letter designs.
            </p>
          </motion.div>

          <TemplateCarousel type="cover" />

          <div className="text-center mt-12">
            <Link href="/templates/cover-letter">
              <Button size="lg" variant="ghost" className="font-bold text-blue-600 group text-lg rounded-full px-8 py-6">
                View All Cover Letters
                <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Three simple steps to your dream career.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-dashed bg-muted -z-10" />

            {[
              { icon: <Layout className="size-8" />, title: "Choose a Template", desc: "Select from our library of ATS-friendly designs." },
              { icon: <FileText className="size-8" />, title: "Fill Your Details", desc: "Add your experience using our AI-guided builder." },
              { icon: <Zap className="size-8" />, title: "Download & Apply", desc: "Export as clean PDF and apply to real job listings." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="size-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-xl shadow-primary/5">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Everything you need to <span className="text-primary">get hired.</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: <FileText className="text-blue-500" />, title: "Resume Builder", desc: "Smart editor with industry-specific suggestions." },
                  { icon: <Target className="text-red-500" />, title: "ATS Checker", desc: "Scan your resume against job descriptions." },
                  { icon: <Search className="text-green-500" />, title: "Job Search", desc: "Access 1000+ developer jobs in India." },
                  { icon: <Layout className="text-purple-500" />, title: "Cover Letter", desc: "AI-generated tailored cover letters." }
                ].map((feat, i) => (
                  <div key={i} className="space-y-3 p-6 bg-background rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-3 bg-muted/50 w-fit rounded-xl">
                      {feat.icon}
                    </div>
                    <h3 className="font-bold">{feat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="relative p-8 bg-card border rounded-3xl shadow-2xl"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">Resume Score</span>
                  <span className="text-2xl font-black text-green-500">78/100</span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "78%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-green-500" 
                  />
                </div>
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/5">System Design</Badge>
                    <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/5">Kubernetes</Badge>
                    <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/5">Redis</Badge>
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground pt-2">Suggestions</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4 text-primary" />
                      Add measurable metrics to experience.
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4 text-primary" />
                      Quantify your impact in projects.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Job Preview Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Jobs in India</h2>
            <p className="text-muted-foreground text-lg">Apply to verified developer roles directly from your dashboard.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {jobs.length > 0 ? jobs.map((job, i) => (
              <Card key={i} className="text-left rounded-3xl hover:shadow-xl transition-all border-muted/50 group">
                <CardHeader>
                  <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors line-clamp-1">{job.title}</CardTitle>
                  <p className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Briefcase className="size-4" />
                    {job.company}
                  </p>
                </CardHeader>
                <CardFooter className="flex justify-between items-center px-6 pb-6 pt-0">
                  <span className="text-xs text-muted-foreground font-medium">{job.location}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full px-4"
                    onClick={() => window.open(job.applyUrl, "_blank")}
                  >
                    Apply Now
                  </Button>
                </CardFooter>
              </Card>
            )) : (
              [1, 2, 3].map((_, i) => (
                <div key={i} className="h-40 rounded-3xl bg-muted animate-pulse" />
              ))
            )}
          </div>

          <Link href="/jobs">
            <Button size="lg" className="font-bold rounded-full px-12 group h-14 text-lg">
              Explore All Jobs
              <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Social Proof Section stays same */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-primary-foreground/20" />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeIn} className="mb-16">
            <div className="inline-flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 italic tracking-tight">&ldquo;I got 3 interview calls in 1 week!&rdquo;</h2>

            <p className="text-xl opacity-80">Trusted by 1000+ job seekers across India.</p>
          </motion.div>

<div className="relative overflow-hidden">
  <motion.div
    animate={{ x: ["0%", "-50%"] }}
    transition={{
      repeat: Infinity,
      duration: 30,
      ease: "linear",
    }}
    className="flex gap-6 w-max"
  >
    {[
      {
        text: "Got interview calls within days after updating my resume using Resume-AI.",
        author: "Emily Carter",
        role: "Frontend Developer",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        text: "The ATS checker helped me optimize keywords and improve my shortlist rate.",
        author: "Michael Brown",
        role: "Backend Engineer",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        text: "Clean templates and super easy editing experience. Loved the UI.",
        author: "Sophia Wilson",
        role: "UI/UX Designer",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
      },
      {
        text: "Probably the fastest resume builder I’ve used till now.",
        author: "Daniel Moore",
        role: "Software Engineer",
        avatar: "https://randomuser.me/api/portraits/men/51.jpg"
      },
      {
        text: "I switched jobs after 3 years and Resume-AI made the process smooth.",
        author: "Olivia Taylor",
        role: "Full Stack Developer",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      {
        text: "Templates actually look modern unlike most resume websites.",
        author: "James Anderson",
        role: "DevOps Engineer",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        text: "The platform feels premium and very easy to use on mobile too.",
        author: "Isabella Thomas",
        role: "Product Designer",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg"
      },
      {
        text: "Built my resume in under 15 minutes and directly started applying.",
        author: "William Harris",
        role: "Java Developer",
        avatar: "https://randomuser.me/api/portraits/men/41.jpg"
      }
    ]
      .concat([
        {
          text: "Got interview calls within days after updating my resume using Resume-AI.",
          author: "Emily Carter",
          role: "Frontend Developer",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          text: "The ATS checker helped me optimize keywords and improve my shortlist rate.",
          author: "Michael Brown",
          role: "Backend Engineer",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          text: "Clean templates and super easy editing experience. Loved the UI.",
          author: "Sophia Wilson",
          role: "UI/UX Designer",
          avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
          text: "Probably the fastest resume builder I’ve used till now.",
          author: "Daniel Moore",
          role: "Software Engineer",
          avatar: "https://randomuser.me/api/portraits/men/51.jpg"
        }
      ])
      .map((t, i) => (
        <div
          key={i}
          className="min-w-[320px] max-w-[320px] bg-white/10 backdrop-blur-xl p-7 rounded-[2rem] border border-white/20 shadow-xl"
        >
          <Quote className="size-7 mb-5 opacity-30" />

          <p className="text-base leading-relaxed font-medium italic mb-8">
            &ldquo;{t.text}&rdquo;
          </p>

          <div className="flex items-center gap-4">
            <img
              src={t.avatar}
              alt={t.author}
              className="size-14 rounded-full object-cover border-2 border-white/20"
            />

            <div>
              <h4 className="font-bold text-lg">{t.author}</h4>
              <p className="text-sm opacity-70">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
  </motion.div>
</div>
        </div>
      </section>

      {/* Final Sections stay same */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Resume-AI?</h2>
            <div className="space-y-6 text-left">
              {[
                { title: "All-in-One Power", desc: "No more switching between 5 different sites. Resume, Jobs, and ATS analysis in one place." },
                { title: "Hyper-Focused on India", desc: "Templates and advice tailored for companies like TCS, Infosys, and top product startups." },
                { title: "Built for Speed", desc: "Generate a professional resume in under 10 minutes. No complicated UI, just results." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-2xl hover:bg-muted/30 transition-colors group">
                  <div className="size-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-gradient-to-br from-primary to-blue-600 rounded-[3rem] p-12 md:p-24 text-center text-primary-foreground shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          
          <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 leading-[1.1]">
            Start building your resume in minutes.
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 relative z-10 font-medium">
            No signup required. Start free.
          </p>
          <Link href="/resume/test" className="relative z-10">
            <Button size="lg" variant="secondary" className="px-12 py-8 text-xl font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-black/20">
              Get Started Free
              <ArrowRight className="ml-3 size-6" />
            </Button>
          </Link>
          
          <div className="mt-12 flex justify-center gap-4 text-sm font-medium opacity-70 relative z-10">
            <span>Free Templates</span>
            <span>•</span>
            <span>ATS-Friendly</span>
            <span>•</span>
            <span>Job Board Access</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
