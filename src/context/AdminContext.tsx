import { createContext, useContext, useState, useMemo, type ReactNode } from "react"
import type { Locale } from "../i18n/locales"
import en from "../i18n/en.json"
import fr from "../i18n/fr.json"
import lb from "../i18n/lb.json"

const messages: Record<Locale, Record<string, string>> = { en, fr, lb }

interface AdminContextType {
  isAuthenticated: boolean
  portfolioLive: boolean
  adminLocale: Locale
  login: () => void
  logout: () => void
  setPortfolioLive: (value: boolean) => void
  setAdminLocale: (locale: Locale) => void
  adminT: (key: string, params?: Record<string, string | number>) => string
}

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("hp_admin_auth") === "true",
  )
  const [portfolioLive, setPortfolioLiveState] = useState(
    () => localStorage.getItem("hp_portfolio_live") !== "false",
  )
  const [adminLocale, setAdminLocaleState] = useState<Locale>(
    () => (localStorage.getItem("hp_admin_locale") as Locale) || "en",
  )

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem("hp_admin_auth", "true")
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("hp_admin_auth")
  }

  const setPortfolioLive = (value: boolean) => {
    setPortfolioLiveState(value)
    localStorage.setItem("hp_portfolio_live", String(value))
  }

  const setAdminLocale = (locale: Locale) => {
    setAdminLocaleState(locale)
    localStorage.setItem("hp_admin_locale", locale)
  }

  const adminT = useMemo(() => {
    const dict = messages[adminLocale]
    const fallback = messages.en
    return (key: string, params?: Record<string, string | number>): string => {
      let str = dict[key] || fallback[key] || key
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          str = str.replaceAll(`{${k}}`, String(v))
        }
      }
      return str
    }
  }, [adminLocale])

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        portfolioLive,
        adminLocale,
        login,
        logout,
        setPortfolioLive,
        setAdminLocale,
        adminT,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider")
  return ctx
}
