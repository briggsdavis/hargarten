import { createContext, useContext, useState, type ReactNode } from "react"

interface AdminContextType {
  isAuthenticated: boolean
  portfolioLive: boolean
  login: () => void
  logout: () => void
  setPortfolioLive: (value: boolean) => void
}

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("hp_admin_auth") === "true",
  )
  const [portfolioLive, setPortfolioLiveState] = useState(
    () => localStorage.getItem("hp_portfolio_live") !== "false",
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

  return (
    <AdminContext.Provider
      value={{ isAuthenticated, portfolioLive, login, logout, setPortfolioLive }}
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
