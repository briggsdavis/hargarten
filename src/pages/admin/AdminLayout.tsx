import { useEffect } from "react"
import { NavLink, Outlet, useNavigate, Link } from "react-router"
import { LayoutDashboard, Building2, MessageSquare, LogOut, ArrowUpLeft } from "lucide-react"
import { useAdmin } from "../../context/AdminContext"

const NAV_ITEMS = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "Property Listings", path: "/admin/listings", icon: Building2 },
  { label: "Inquiries", path: "/admin/inquiries", icon: MessageSquare },
]

export const AdminLayout = () => {
  const { isAuthenticated, logout } = useAdmin()
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
      {/* ─── Sidebar ──────────────────────────────────────────── */}
      <aside className="w-64 bg-white border-r border-[#e8e4df] flex flex-col fixed h-full z-10">
        {/* Brand */}
        <div className="px-6 py-7 border-b border-[#e8e4df]">
          <h1
            className="font-serif text-[#163b0f] tracking-tighter leading-none"
            style={{ fontSize: "1.2rem" }}
          >
            Hargarten
          </h1>
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#163b0f]/40 mt-1 font-sans">
            Admin Portal
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="text-[9px] uppercase tracking-widest text-[#9ca3af] font-sans font-medium px-3 mb-3">
            Navigation
          </p>
          <div className="flex flex-col gap-0.5">
            {NAV_ITEMS.map(({ label, path, icon: Icon, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-sans transition-all duration-150 ${
                    isActive
                      ? "bg-[#163b0f] text-[#fbf6f1] font-medium"
                      : "text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f5f4f0]"
                  }`
                }
              >
                <Icon size={15} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-5 border-t border-[#e8e4df] flex flex-col gap-0.5">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-sans text-[#6b7280] hover:text-[#1a1a1a] hover:bg-[#f5f4f0] transition-all"
          >
            <ArrowUpLeft size={15} />
            <span>Back to Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-sans text-[#6b7280] hover:text-red-600 hover:bg-red-50 transition-all w-full text-left"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─────────────────────────────────────── */}
      <main className="flex-1 ml-64 min-h-screen overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
