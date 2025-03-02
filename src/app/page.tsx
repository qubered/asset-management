"use client"
import { ThemeToggle } from "@/components/themes/theme-switcher"
import { buttonVariants } from "@/components/ui/button"
import { Database } from "lucide-react";
import Link from "next/link";
import { Hero32 } from "@/components/home-hero";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="">
      <div className="flex fixed top-4 right-4 z-50 gap-4">
        <ThemeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>

      </div>
      <Hero32 heading="Asset Management" description="Theatre focused asset management system" button={{ text: (
        <>
          <SignedIn>
            Dashboard
          </SignedIn>
          <SignedOut>
            Login to Get Started
          </SignedOut>
        </>
      ), url: "/main" }} />
    </main>
  );
}
