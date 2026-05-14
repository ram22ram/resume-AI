import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg">
          <ShieldCheck className="size-6 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      </div>
      
      <p className="text-muted-foreground mb-12">
        Last Updated: April 24, 2026
      </p>

      <div className="space-y-12 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Name:</strong> To personalize your account and resumes.</li>
            <li><strong>Email address:</strong> For account management and communication.</li>
            <li><strong>Resume data:</strong> Any professional information you input to generate resumes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our resume building services.</li>
            <li>To improve and personalize your user experience.</li>
            <li>To communicate with you regarding updates or support.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Data Protection</h2>
          <p>
            Your security is our priority. We use industry-standard secure systems and end-to-end encryption to protect your sensitive information from unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Cookies</h2>
          <p>
            We use cookies to analyze website traffic and optimize your performance. These small data files help us understand how you interact with our platform to provide a smoother experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
          <p className="mb-4">We collaborate with trusted third-party providers for specific functionalities:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Payment gateways (Razorpay):</strong> To process secure transactions for Pro subscriptions.</li>
            <li><strong>Analytics tools:</strong> To gather anonymized usage data for platform improvements.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">User Rights</h2>
          <p className="mb-4">You have full control over your data on Resume-AI:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Access data:</strong> View all the information we have stored.</li>
            <li><strong>Request deletion:</strong> Permanently remove your account and all associated data.</li>
            <li><strong>Update information:</strong> Edit your profile and resume details anytime.</li>
          </ul>
        </section>

        <section className="bg-muted/50 p-8 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Mail className="size-5" /> Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions or concerns regarding our privacy practices, please reach out to us at:
          </p>
          <a href="mailto:support@resume-ai.com" className="text-primary font-bold text-lg hover:underline">
            support@resume-ai.com
          </a>
        </section>
      </div>
    </div>
  );
}
