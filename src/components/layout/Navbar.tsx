"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthStore";
import { UserDropdown } from "./UserDropdown";
import React from "react";
import Image from "next/image";

export function Navbar() {
  const { data: session, status } = useSession();
  const { onOpen } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-white/75 supports-[backdrop-filter]:bg-white/60 text-black border-b border-black/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 sm:px-6 text-sm sm:text-base h-[72px] flex items-center justify-between">
        {/* Logo */}
       {/* Logo */}
<Link
  href="/"
  className="transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
>
  <Image
    src="/icons/logo-light.png"
    alt="Resume AI"
    width={170}
    height={40}
    priority
    className="h-10 w-auto"
  />
</Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/ats-checker"
            className="relative text-black/60 hover:text-black transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            ATS Checker
          </Link>
          <Link
            href="/jobs"
            className="relative text-black/60 hover:text-black transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            Jobs
          </Link>
          <Link
            href="/pricing"
            className="relative text-black/60 hover:text-black transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
          >
            Pricing
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="size-10 rounded-full bg-primary-foreground/10 animate-pulse" />
          ) : session ? (
            <UserDropdown user={session.user} />
          ) : (
            <Button
              variant="secondary"
              className="rounded-xl px-4 sm:px-4 sm:px-6 text-sm sm:text-base font-semibold shadow-sm hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300"
              onClick={() => onOpen("login")}
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}