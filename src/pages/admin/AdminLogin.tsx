import { useState } from "react"
import { useNavigate } from "react-router"
import { useAdmin } from "../../context/AdminContext"
import type { Locale } from "../../i18n/locales"

const LOCALES: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "lb", label: "LB" },
]

export const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, adminT, adminLocale, setAdminLocale } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login()
    navigate("/admin")
  }

  return (
    <div className="admin-portal flex min-h-screen items-center justify-center bg-[#f5f4f0] px-4">
      {/* Language switcher - top right */}
      <div className="fixed top-5 right-6 flex items-center gap-1">
        {LOCALES.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => setAdminLocale(code)}
            className={`rounded px-3 py-1.5 font-sans text-xs font-bold tracking-widest uppercase transition-all ${
              adminLocale === code
                ? "bg-[#163b0f] text-[#fbf6f1]"
                : "text-[#9ca3af] hover:bg-white hover:text-[#1a1a1a]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 text-center">
          <h1
            className="font-serif tracking-tighter text-[#163b0f]"
            style={{ fontSize: "1.6rem" }}
          >
            Hargarten Properties
          </h1>
          <p className="mt-2 font-sans text-xs tracking-[0.25em] text-[#163b0f]/40 uppercase">
            {adminT("admin_login_portal")}
          </p>
        </div>

        {/* Card */}
        <div className="border border-[#e8e4df] bg-white p-10 shadow-sm">
          <h2 className="mb-1 font-sans text-lg font-medium tracking-tight text-[#1a1a1a]">
            {adminT("admin_login_heading")}
          </h2>
          <p className="mb-8 font-sans text-sm text-[#6b7280]">
            {adminT("admin_login_subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block font-sans text-xs font-medium tracking-widest text-[#6b7280] uppercase">
                {adminT("admin_login_email")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hargarten-properties.lu"
                className="w-full border border-[#e5e7eb] bg-white px-4 py-3 font-sans text-sm text-[#1a1a1a] transition-colors placeholder:text-[#9ca3af] focus:border-[#163b0f] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block font-sans text-xs font-medium tracking-widest text-[#6b7280] uppercase">
                {adminT("admin_login_password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-[#e5e7eb] bg-white px-4 py-3 font-sans text-sm text-[#1a1a1a] transition-colors focus:border-[#163b0f] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-[#163b0f] py-3.5 font-sans text-xs font-bold tracking-widest text-[#fbf6f1] uppercase transition-colors hover:bg-[#163b0f]/90"
            >
              {adminT("admin_login_button")}
            </button>
          </form>

          <p className="mt-6 text-center font-sans text-xs text-[#9ca3af]">
            {adminT("admin_login_demo")}
          </p>
        </div>

        <p className="mt-6 text-center font-sans text-xs text-[#6b7280]/50">
          © {new Date().getFullYear()} Hargarten Properties Sàrl-s
        </p>
      </div>
    </div>
  )
}
