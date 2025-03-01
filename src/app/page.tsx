"use client"
import { ThemeToggle } from "@/components/themes/theme-switcher"
import { buttonVariants } from "@/components/ui/button"
import { Database } from "lucide-react";
import Link from "next/link";


export default function HomePage() {
  return (
    <main>
      <div className="flex p-4 justify-end sticky top-0 bg-background">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center h-screen gap-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Database className="w-10 h-10"></Database>
            <h1 className="text-4xl font-bold">Asset Management</h1>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg">Theatre focused asset management system</p>
            <p className="text-lg text-muted-foreground">Built by theatre people</p>
          </div>
          <Link href="/main" className={buttonVariants({ variant: "default" })}>Get Started</Link>
        </div>
      </div>
    </main>
  );
}
