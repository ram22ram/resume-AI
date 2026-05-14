import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const footerLinks = {
    product: [
      { label: "Resume Builder", href: "/resume/new" },
      { label: "Cover Letter", href: "/cover-letter/new" },
      { label: "Resume Templates", href: "/templates/test" },
      { label: "Cover Letter Templates", href: "/templates/test" },
      { label: "ATS Checker", href: "/ats-checker" },
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Career", href: "/career" },
      { label: "Jobs", href: "/jobs" },
    ],
    company: [
      { label: "Pricing", href: "/pricing" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  };

  return (
    <footer className="w-full bg-muted/30 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 mb-14">

          {/* BRAND */}
         <div className="space-y-4">
  <Link href="/">
    <Image
      src="/icons/logo-light.png"
      alt="Resume AI"
      width={170}
      height={40}
      className="h-10 w-auto"
    />
  </Link>

  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
    Build your career faster
  </p>
</div>

          {/* PRODUCT */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Resume-AI. All rights reserved.</p>

          <p>
            Powered by{" "}
            <Link 
              href="https://sankhlabs.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              SankhLabs
            </Link>
          </p>
        </div>

      </div>
    </footer>
  );
}