import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  LogOut,
  ArrowUpLeft,
} from "lucide-react"
import { useEffect } from "react"
import { NavLink, Outlet, useNavigate, Link } from "react-router"
import { useAdmin } from "../../context/AdminContext"
import type { Locale } from "../../i18n/locales"

const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "lb", label: "LB" },
]

export const AdminLayout = () => {
  const { isAuthenticated, logout, adminT, adminLocale, setAdminLocale } =
    useAdmin()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login")
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  if (!isAuthenticated) return null

  return (
    <div className="admin-portal flex min-h-screen bg-[#f5f4f0]">
      {/* Sidebar */}
      <aside className="fixed z-10 flex h-full w-64 flex-col border-r border-[#e8e4df] bg-white">
        {/* Brand */}
        <div className="border-b border-[#e8e4df] px-6 py-7">
          <h1
            className="font-serif leading-none tracking-tighter text-[#163b0f]"
            style={{ fontSize: "1.2rem" }}
          >
            Hargarten
          </h1>
          <p className="mt-1 font-sans text-[9px] tracking-[0.2em] text-[#163b0f]/40 uppercase">
            {adminT("admin_portal")}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="mb-3 px-3 font-sans text-[9px] font-medium tracking-widest text-[#9ca3af] uppercase">
            {adminT("admin_nav_section")}
          </p>
          <div className="flex flex-col gap-0.5">
            {(
              [
                {
                  key: "admin_nav_dashboard",
                  path: "/admin",
                  icon: LayoutDashboard,
                  end: true,
                },
                {
                  key: "admin_nav_listings",
                  path: "/admin/listings",
                  icon: Building2,
                  end: false,
                },
                {
                  key: "admin_nav_inquiries",
                  path: "/admin/inquiries",
                  icon: MessageSquare,
                  end: false,
                },
              ] as const
            ).map(({ key, path, icon: Icon, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2.5 font-sans text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-[#163b0f] font-medium text-[#fbf6f1]"
                      : "text-[#6b7280] hover:bg-[#f5f4f0] hover:text-[#1a1a1a]"
                  }`
                }
              >
                <Icon size={15} />
                <span>{adminT(key)}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="flex flex-col gap-0.5 border-t border-[#e8e4df] px-3 py-5">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 font-sans text-sm text-[#6b7280] transition-all hover:bg-[#f5f4f0] hover:text-[#1a1a1a]"
          >
            <ArrowUpLeft size={15} />
            <span>{adminT("admin_back_to_site")}</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left font-sans text-sm text-[#6b7280] transition-all hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={15} />
            <span>{adminT("admin_sign_out")}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex min-h-screen flex-1 flex-col overflow-y-auto">
        {/* Language Switcher Header Bar */}
        <div className="flex flex-shrink-0 items-center justify-end gap-1 border-b border-[#e8e4df] bg-white px-8 py-3">
          {LOCALES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setAdminLocale(code)}
              className={`rounded px-3 py-1.5 font-sans text-[9px] font-bold tracking-widest uppercase transition-all ${
                adminLocale === code
                  ? "bg-[#163b0f] text-[#fbf6f1]"
                  : "text-[#9ca3af] hover:bg-[#f5f4f0] hover:text-[#1a1a1a]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <Outlet />
      </main>
    </div>
  )
}
