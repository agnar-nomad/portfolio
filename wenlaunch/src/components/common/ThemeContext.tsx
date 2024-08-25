'use client'

import { createContext, useContext, useEffect, useState } from "react"
import type { Dispatch, SetStateAction } from 'react'
import { DARK_THEME, LIGHT_THEME, wlThemeStorageKey } from '@/config'

type Theme = typeof DARK_THEME | typeof LIGHT_THEME | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  localStorageKey?: string
}

type ThemeProviderState = {
  theme: Theme,
  setTheme: Dispatch<SetStateAction<Theme>>,
  isDarkMode: boolean,
}

const ThemeProviderContext = createContext<ThemeProviderState | null>(null)


export default function ThemeProvider({
  children,
  defaultTheme = "system",
  localStorageKey = wlThemeStorageKey,
}: ThemeProviderProps) {

  const [theme, setTheme] = useState<Theme>(defaultTheme)

  // const prefersDarkColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches

  useEffect(() => {
    const storedTheme = localStorage.getItem(localStorageKey) as Theme | null;

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [localStorageKey]);


  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK_THEME : LIGHT_THEME;

      root.dataset.theme = systemTheme;
      return
    }

    root.dataset.theme = theme;
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: SetStateAction<Theme>) => {
      localStorage.setItem(localStorageKey, theme as string)
      setTheme(theme)
    },
    isDarkMode: theme !== LIGHT_THEME
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}