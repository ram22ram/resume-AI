import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, ChevronRight } from "lucide-react";

export default function BlogPage() {
  const blogs = [
    {
      slug: "best-resume-format-for-freshers-in-india-2026",
      title: "Best Resume Format for Freshers in India 2026",
      description: "Discover the best resume format for freshers in India. Learn how to create an ATS-friendly resume that increases your chances of getting hired.",
      date: "April 24, 2026",
      readTime: "5 min",
      author: "Career Expert",
    },
    {
      slug: "top-10-resume-mistakes-to-avoid",
      title: "Top 10 Resume Mistakes to Avoid",
      description: "Avoid the top 10 resume mistakes that get candidates rejected. Learn how to create an ATS-friendly resume and increase your chances of getting hired.",
      date: "April 24, 2026",
      readTime: "6 min",
      author: "Career Expert",
    },
    {
      slug: "how-to-crack-your-first-job-interview",
      title: "How to Crack Your First Job Interview",
      description: "Learn how to crack your first job interview with this step-by-step guide and land your dream job.",
      date: "April 24, 2026",
      readTime: "7 min",
      author: "Career Expert",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Resume-AI Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert insights on resume building, interview preparation, and career growth to help you land your dream job.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, i) => (
          <Card key={i} className="flex flex-col h-full hover:shadow-xl transition-all duration-300 border-border/50 group overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1 font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                  <Calendar className="size-3" />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {blog.readTime} read
                </span>
              </div>
              <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription className="text-sm line-clamp-3 leading-relaxed">
                {blog.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="pt-4 border-t border-border/50">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <User className="size-3" />
                  {blog.author}
                </div>
                <Link href={`/blog/${blog.slug}`}>
                  <Button variant="ghost" size="sm" className="group/btn text-primary hover:text-primary hover:bg-primary/5 p-0 h-auto font-bold">
                    Read More 
                    <ChevronRight className="size-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Newsletter / CTA Section */}
      <div className="mt-24 p-8 md:p-16 bg-muted/30 rounded-[3rem] border border-border/50 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Stay ahead in your career</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter for the latest career tips, industry insights, and exclusive resume templates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-3 rounded-xl border border-border bg-background flex-1 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <Button className="px-8 py-3 rounded-xl font-bold">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
