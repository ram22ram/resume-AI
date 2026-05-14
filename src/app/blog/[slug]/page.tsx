import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, ChevronRight, Share2, Bookmark, Sparkles, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const BLOG_POSTS = {
  "best-resume-format-for-freshers-in-india-2026": {
    title: "Best Resume Format for Freshers in India 2026",
    description: "Discover the best resume format for freshers in India. Learn how to create an ATS-friendly resume and land your first job.",
    author: "Career Expert",
    date: "April 24, 2026",
    readTime: "5 min",
    content: (
      <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-black prose-p:text-lg prose-p:leading-relaxed">
        <section className="mb-10">
          <h2 className="text-3xl font-black mb-6">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Creating your first resume can feel confusing. As a fresher, you may not have much experience, but the right resume format can still help you stand out in the competitive Indian job market.
          </p>
        </section>
        
        <div className="my-12 p-8 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-[2.5rem] border border-primary/20 relative overflow-hidden group">
           <div className="relative z-10">
              <h3 className="text-2xl font-black mb-2 text-primary">Pro Tip for Freshers</h3>
              <p className="text-lg font-medium text-muted-foreground mb-6">Don't have work experience? Focus on your projects and internships. Recruiters value hands-on skills over theory.</p>
              <Button asChild className="rounded-2xl h-12 px-6 font-black shadow-xl shadow-primary/20 group-hover:scale-105 transition-transform">
                 <Link href="/resume/new">Create Your Fresher Resume <Sparkles className="ml-2 size-4" /></Link>
              </Button>
           </div>
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="size-32" />
           </div>
        </div>

        <section className="mb-10">
          <h2 className="text-3xl font-black mb-6 text-primary">Types of Resume Formats</h2>
          <ul className="list-disc pl-6 space-y-4 text-muted-foreground text-lg">
            <li><strong>Chronological Resume</strong> – Focuses on work experience. Great if you had solid internships.</li>
            <li><strong>Functional Resume</strong> – Focuses on skills. Ideal if you're switching fields or have zero experience.</li>
            <li><strong>Combination Resume</strong> – The modern standard. Mix of skills and projects.</li>
          </ul>
        </section>

        <section className="mb-10 p-10 bg-muted/30 rounded-[2.5rem] border border-muted-foreground/10">
          <h2 className="text-3xl font-black mb-4 text-primary italic">The Winner 🏆</h2>
          <p className="text-2xl font-black mb-4">The Combination Format</p>
          <p className="text-lg text-muted-foreground mb-6">Why? Because it highlights what you can DO, while still showing your academic journey. It's the most ATS-friendly format today.</p>
          <div className="grid grid-cols-2 gap-4">
             <div className="flex items-center gap-2 text-sm font-bold"><ChevronRight className="size-4 text-primary" /> Skill Centric</div>
             <div className="flex items-center gap-2 text-sm font-bold"><ChevronRight className="size-4 text-primary" /> Project Focused</div>
          </div>
        </section>
      </div>
    )
  },
  // Other posts follow the same optimized structure...
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = BLOG_POSTS[params.slug as keyof typeof BLOG_POSTS];
  if (!post) return { title: "Blog | ResumeAI" };

  return {
    title: `${post.title} | ResumeAI Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS[params.slug as keyof typeof BLOG_POSTS];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header CTA for Conversion */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-muted-foreground/5 py-4 px-6 md:hidden">
         <div className="flex justify-between items-center max-w-4xl mx-auto">
            <span className="text-sm font-black tracking-tight">Resume-AI</span>
            <Button size="sm" className="rounded-full font-black text-xs h-9 px-4" asChild>
               <Link href="/resume/new">Build Resume</Link>
            </Button>
         </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
        <article className="relative">
          <Link href="/blog" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary mb-12 group transition-colors">
            <ArrowLeft className="size-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Articles
          </Link>

          <header className="mb-16">
            <div className="flex items-center gap-3 mb-6">
               <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/10">Career Guide</span>
               <span className="text-muted-foreground/40 font-bold text-xs">•</span>
               <span className="text-xs font-bold text-muted-foreground italic">{post.readTime} read</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.95]">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-muted-foreground/5">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-muted rounded-full overflow-hidden ring-4 ring-muted-foreground/5">
                   <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-primary font-black">RV</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black">{post.author}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Expert Mentor</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-muted/30 px-3 py-2 rounded-xl">
                <Calendar className="size-3" />
                <span>{post.date}</span>
              </div>
            </div>
          </header>

          <div className="relative">
             {post.content}
          </div>

          <div className="mt-24 pt-12 border-t border-muted-foreground/10">
            <div className="bg-gradient-to-br from-primary to-blue-700 p-10 md:p-16 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                 <ShieldCheck className="size-60" />
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-black mb-6 leading-none">Ready to land your dream role?</h3>
                <p className="opacity-80 mb-10 max-w-md mx-auto text-lg font-medium">Don't let manual errors hold you back. Join 10,000+ winners using our AI-powered builder.</p>
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary" className="h-16 px-10 text-xl font-black rounded-2xl shadow-2xl hover:scale-105 transition-transform">
                    Start Building for Free <ArrowRight className="ml-2 size-6" />
                  </Button>
                </Link>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">No credit card required</p>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar for Desktop Retention/Upsell */}
        <aside className="hidden lg:block space-y-10">
           <div className="sticky top-24 space-y-10">
              <div className="p-8 bg-muted/20 rounded-[2rem] border border-muted-foreground/5">
                 <h4 className="text-lg font-black mb-4 tracking-tight">Need a professional resume?</h4>
                 <p className="text-sm text-muted-foreground font-medium mb-6 leading-relaxed">Stop worrying about formatting. Our AI does the heavy lifting for you.</p>
                 <Button className="w-full h-12 rounded-xl font-black" asChild>
                    <Link href="/resume/new">Build Now — It's Free</Link>
                 </Button>
              </div>

              <div className="space-y-6 px-4">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Related Guides</h4>
                 <div className="space-y-6">
                    {Object.entries(BLOG_POSTS).filter(([slug]) => slug !== params.slug).slice(0, 2).map(([slug, data]) => (
                       <Link key={slug} href={`/blog/${slug}`} className="group block">
                          <h5 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">{data.title}</h5>
                          <span className="text-[10px] font-black text-muted-foreground uppercase mt-2 block">{data.readTime} read</span>
                       </Link>
                    ))}
                 </div>
              </div>

              <div className="flex gap-4 px-4 pt-8 border-t border-muted-foreground/5">
                 <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
                    <Share2 className="size-4" />
                 </Button>
                 <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/5 hover:text-primary transition-colors">
                    <Bookmark className="size-4" />
                 </Button>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
