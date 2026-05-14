import { FileText, Scale } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      title: "1. User Responsibilities",
      content: "Users must provide accurate, current, and complete information when creating an account and building resumes. Any misleading information is the sole responsibility of the user."
    },
    {
      title: "2. Acceptable Use",
      content: "Users agree not to engage in any illegal activity or upload harmful content, including malware, offensive material, or content that infringes on intellectual property rights."
    },
    {
      title: "3. Account Usage",
      content: "You are responsible for maintaining the confidentiality of your account credentials. All activities occurring under your account are your responsibility."
    },
    {
      title: "4. Subscription & Payments",
      content: "Access to premium features requires a valid Pro subscription. All payments are processed through secure gateways, and subscription terms are billed based on the plan selected."
    },
    {
      title: "5. Refund Policy",
      content: "Subscription payments are generally non-refundable. However, refunds may be provided at our sole discretion based on technical issues or exceptional circumstances."
    },
    {
      title: "6. Limitation of Liability",
      content: "Resume-AI provides tools to assist in job applications but does not guarantee employment or specific job outcomes. We are not liable for any career-related decisions or results."
    },
    {
      title: "7. Termination",
      content: "We reserve the right to suspend or terminate accounts that violate these terms or engage in misuse of the platform without prior notice."
    },
    {
      title: "8. Changes to Terms",
      content: "These terms and conditions may be updated at any time. Continued use of the platform after updates constitutes acceptance of the new terms."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Scale className="size-6 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Terms & Conditions</h1>
      </div>
      
      <p className="text-muted-foreground mb-12">
        Effective Date: April 24, 2026
      </p>

      <div className="grid gap-12">
        {sections.map((section, index) => (
          <section key={index} className="group">
            <h2 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              {section.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {section.content}
            </p>
          </section>
        ))}
      </div>

      <div className="mt-20 pt-12 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-muted/30 p-8 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-background rounded-full shadow-sm">
              <FileText className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold">Have questions about our terms?</p>
              <p className="text-sm text-muted-foreground">We're here to help you understand your rights.</p>
            </div>
          </div>
          <a 
            href="mailto:support@resume-ai.com" 
            className="px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
