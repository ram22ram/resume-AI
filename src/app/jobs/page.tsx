"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Briefcase, MapPin, Building2, ExternalLink, Search } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  applyUrl: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [location, setLocation] = useState("India");
  const [role, setRole] = useState("Developer");

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/jobs?location=${encodeURIComponent(location)}&role=${encodeURIComponent(role)}`);
      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setJobs(result.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [location, role]);

  useEffect(() => {
    fetchJobs();
  }, []); // Initial fetch only

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Briefcase className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
            <p className="text-muted-foreground text-sm">Find your next career move</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full border border-border/50">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Active Search:</span>
          <span className="text-sm font-medium">{role} jobs in {location}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <form onSubmit={handleSearch} className="p-6 border rounded-2xl bg-card shadow-sm space-y-6">
              <h3 className="font-bold flex items-center gap-2 text-lg">
                <Search className="size-4 text-primary" />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="role" className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                    Role
                  </label>
                  <Input 
                    id="role"
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Developer, Designer"
                    className="bg-muted/30 border-none focus-visible:ring-1"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                    Location
                  </label>
                  <Input 
                    id="location"
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. India, Remote, USA"
                    className="bg-muted/30 border-none focus-visible:ring-1"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full font-bold py-6 group" disabled={loading}>
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    Search Jobs
                    <ChevronRight className="size-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
            
            <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-sm font-bold text-primary mb-2">Pro Tip</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Be specific with roles like "Frontend React Developer" for better results from JSearch.
              </p>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-bold text-xl flex items-center gap-2">
              Latest Opportunities
              {!loading && <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{jobs.length} found</span>}
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4 bg-muted/20 rounded-3xl border border-dashed">
              <Loader2 className="size-12 text-primary animate-spin" />
              <p className="text-muted-foreground font-bold text-lg animate-pulse">Searching the web...</p>
            </div>
          ) : error ? (
            <div className="p-12 border-2 border-destructive/10 bg-destructive/5 rounded-3xl text-center">
              <div className="size-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="size-6" />
              </div>
              <p className="text-destructive font-bold text-xl mb-2">Oops! Something went wrong</p>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{error}</p>
              <Button onClick={() => fetchJobs()} variant="outline">
                Retry Connection
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <Card key={job.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden rounded-2xl">
                  <CardHeader className="pb-4 pt-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors cursor-pointer leading-tight mb-2">
                          {job.title}
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2 font-bold text-foreground">
                            <Building2 className="size-4 text-primary/60" />
                            {job.company}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="size-4 text-primary/60" />
                            {job.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="py-4 border-t border-border/30 bg-muted/5 flex justify-between items-center px-6">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-black text-muted-foreground/40 bg-muted px-2 py-1 rounded">
                        Verified
                      </span>
                    </div>
                    <Button 
                      onClick={() => window.open(job.applyUrl, "_blank")}
                      size="sm"
                      className="gap-2 rounded-full px-6 font-bold"
                    >
                      Apply 
                      <ExternalLink className="size-3" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {jobs.length === 0 && (
                <div className="text-center py-32 bg-muted/10 rounded-3xl border-2 border-dashed border-border/50">
                  <div className="size-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="size-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-foreground/80">No matches found</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    Try adjusting your filters or search for something more broad.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper icons that might be missing from the user's previous context
function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
