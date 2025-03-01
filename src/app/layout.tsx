import "@/styles/globals.css";
import { ThemeProvider } from "@/components/themes/theme-provider";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ClerkThemeWrapper } from "@/components/themes/clerk-theme-wrapper";

export const metadata: Metadata = {
  title: "Theatre Asset Management",
  description: "Theatre focused asset management system",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <ClerkThemeWrapper>
            {children}
          </ClerkThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
