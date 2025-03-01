"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function SimpleThemeButton() {
    const { theme } = useTheme()

    return (
        <>
            {theme === "dark" ? <Sun /> : <Moon />}
        </>
    )
}