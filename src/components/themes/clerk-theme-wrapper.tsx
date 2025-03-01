"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes"

export function ClerkThemeWrapper({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme()

    return (
        <ClerkProvider appearance={{ baseTheme: theme === "dark" ? dark : undefined }}>
            {children}
        </ClerkProvider>
    )
} 