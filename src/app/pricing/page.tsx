"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useUpgradeModal } from "@/components/modals/upgrade-modal";

export default function PricingPage() {
  const router = useRouter();
  const { onOpen: onUpgradeOpen } = useUpgradeModal();

  const faqs = [
    { q: "Is Resume-AI really free?", a: "Yes, you can create and download resumes for free with basic features." },
    { q: "What do I get with Pro?", a: "You unlock premium templates, ATS checker, cover letter builder, and unlimited downloads." },
    { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription anytime." },
    { q: "Is my data secure?", a: "Yes, your data is securely stored and not shared." },
    { q: "Do resumes work with ATS systems?", a: "Yes, our templates are optimized for ATS." },
    { q: "Which payment methods are supported?", a: "We support UPI, cards, and net banking." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Build a Job-Winning Resume in Minutes
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create professional, ATS-friendly resumes and cover letters that help you get hired faster.
        </p>
      </div>

      {/* Plans Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
        {/* Free Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Free Plan</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₹0</span>
              <span className="text-muted-foreground ml-2">forever</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span className="text-sm">Basic Resume Builder</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span className="text-sm">1 ATS-friendly Template</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span className="text-sm">Clean PDF Download</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span className="text-sm">Limited Features</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {/* FIX: Now navigates to the resume builder */}
            <Button
              className="w-full"
              variant="outline"
              onClick={() => router.push('/resume/new')}
            >
              Start for Free
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="flex flex-col border-primary shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg">
            Recommended
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Pro Plan</CardTitle>
            <CardDescription>For serious job seekers</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₹199</span>
              <span className="text-muted-foreground ml-2">/month</span>
              <div className="text-xs text-primary mt-1 font-medium">Or ₹999/year (Save 58%)</div>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span className="text-sm font-medium">Multiple Premium Templates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span className="text-sm font-medium">Unlimited Resumes & Cover Letters</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span className="text-sm font-medium">ATS Score Checker</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span className="text-sm font-medium">Cover Letter Generator</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-primary" />
                <span className="text-sm font-medium">Unlimited Downloads</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {/* FIX: Now opens upgrade modal with Razorpay flow */}
            <Button
              className="w-full"
              onClick={onUpgradeOpen}
            >
              Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Comparison Table */}
      <div className="mb-24 overflow-x-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Compare Plans</h2>
        <table className="w-full max-w-3xl mx-auto border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-4 px-6 font-semibold">Feature</th>
              <th className="text-center py-4 px-6 font-semibold">Free</th>
              <th className="text-center py-4 px-6 font-semibold text-primary">Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/50">
              <td className="py-4 px-6 text-sm">Resume Builder</td>
              <td className="py-4 px-6 text-center"><Check className="size-4 mx-auto text-muted-foreground" /></td>
              <td className="py-4 px-6 text-center"><Check className="size-4 mx-auto text-primary" /></td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-4 px-6 text-sm">Templates</td>
              <td className="py-4 px-6 text-center text-sm text-muted-foreground">1</td>
              <td className="py-4 px-6 text-center text-sm font-medium">Multiple</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-4 px-6 text-sm">PDF Download</td>
              <td className="py-4 px-6 text-center"><Check className="size-4 mx-auto text-muted-foreground" /></td>
              <td className="py-4 px-6 text-center text-sm font-medium">Clean</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-4 px-6 text-sm">ATS Checker</td>
              <td className="py-4 px-6 text-center"><X className="size-4 mx-auto text-muted-foreground/30" /></td>
              <td className="py-4 px-6 text-center"><Check className="size-4 mx-auto text-primary" /></td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-4 px-6 text-sm">Cover Letter</td>
              <td className="py-4 px-6 text-center"><X className="size-4 mx-auto text-muted-foreground/30" /></td>
              <td className="py-4 px-6 text-center"><Check className="size-4 mx-auto text-primary" /></td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-4 px-6 text-sm">Downloads</td>
              <td className="py-4 px-6 text-center text-sm text-muted-foreground">Limited</td>
              <td className="py-4 px-6 text-center text-sm font-medium">Unlimited</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
