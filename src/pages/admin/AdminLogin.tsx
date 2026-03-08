import { useState } from "react"
import { useNavigate } from "react-router"
import { useAdmin } from "../../context/AdminContext"

export const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAdmin()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login()
    navigate("/admin")
  }

  return (
    <div className="admin-portal min-h-screen bg-[#f5f4f0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="font-serif text-[#163b0f] tracking-tighter"
            style={{ fontSize: "1.6rem" }}
          >
            Hargarten Properties
          </h1>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#163b0f]/40 mt-2 font-sans">
            Administrative Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e8e4df] p-10 shadow-sm">
          <h2 className="text-lg font-sans font-medium text-[#1a1a1a] mb-1 tracking-tight">
            Sign in
          </h2>
          <p className="text-sm font-sans text-[#6b7280] mb-8">
            Access the management dashboard
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#6b7280] mb-2 font-sans font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hargarten-properties.lu"
                className="w-full px-4 py-3 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors bg-white text-[#1a1a1a] placeholder:text-[#9ca3af]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#6b7280] mb-2 font-sans font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors bg-white text-[#1a1a1a]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#163b0f] text-[#fbf6f1] py-3.5 text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#163b0f]/90 transition-colors mt-2"
            >
              Sign In
            </button>
          </form>

          <p className="text-[10px] font-sans text-[#9ca3af] mt-6 text-center">
            Demo mode — any credentials grant access
          </p>
        </div>

        <p className="text-center text-[10px] font-sans text-[#6b7280]/50 mt-6">
          © {new Date().getFullYear()} Hargarten Properties Sàrl-s
        </p>
      </div>
    </div>
  )
}
