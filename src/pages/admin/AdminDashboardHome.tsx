import { useAdmin } from "../../context/AdminContext"
import { PROPERTIES } from "../../constants"
import { Building2, MessageSquare, Eye, EyeOff, CheckSquare } from "lucide-react"

const UNREAD_INQUIRIES_COUNT = 3

export const AdminDashboardHome = () => {
  const { portfolioLive, setPortfolioLive, adminT } = useAdmin()

  const availableCount = PROPERTIES.filter((p) => p.status === "Available").length
  const totalCount = PROPERTIES.length

  return (
    <div className="p-8 max-w-4xl">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-widest text-[#9ca3af] font-sans mb-1">
          {adminT("admin_overview")}
        </p>
        <h2 className="text-2xl font-sans font-semibold text-[#1a1a1a] tracking-tight">
          {adminT("admin_dashboard_title")}
        </h2>
        <p className="text-sm font-sans text-[#6b7280] mt-1">
          {adminT("admin_dashboard_subtitle")}
        </p>
      </div>

      {/* Portfolio Visibility Toggle */}
      <div
        className={`rounded-xl border-2 p-6 mb-8 transition-all duration-500 ${
          portfolioLive ? "bg-[#163b0f]/[0.04] border-[#163b0f]/20" : "bg-amber-50 border-amber-200"
        }`}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {portfolioLive ? (
                <Eye size={15} className="text-[#163b0f]" />
              ) : (
                <EyeOff size={15} className="text-amber-600" />
              )}
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-[#6b7280]">
                {adminT("admin_portfolio_visibility")}
              </span>
            </div>

            <h3 className="text-lg font-sans font-semibold text-[#1a1a1a] mb-1.5 tracking-tight">
              {portfolioLive
                ? adminT("admin_portfolio_live_title")
                : adminT("admin_portfolio_hidden_title")}
            </h3>

            <p className="text-sm font-sans text-[#6b7280] leading-relaxed">
              {portfolioLive
                ? adminT("admin_portfolio_live_desc")
                : adminT("admin_portfolio_hidden_desc")}
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setPortfolioLive(!portfolioLive)}
              className={`relative w-14 h-7 rounded-full transition-all duration-400 focus:outline-none ${
                portfolioLive ? "bg-[#163b0f]" : "bg-[#d1d5db]"
              }`}
              aria-label="Toggle portfolio visibility"
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${
                  portfolioLive ? "left-8" : "left-1"
                }`}
              />
            </button>
            <span
              className={`text-[9px] uppercase tracking-widest font-sans font-bold ${
                portfolioLive ? "text-[#163b0f]" : "text-[#9ca3af]"
              }`}
            >
              {portfolioLive ? adminT("admin_portfolio_on") : adminT("admin_portfolio_off")}
            </span>
          </div>
        </div>

        {/* Status pill */}
        <div className="mt-5 pt-4 border-t border-current/10 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-sans font-semibold px-3 py-1 rounded-full ${
              portfolioLive ? "bg-[#163b0f]/10 text-[#163b0f]" : "bg-amber-100 text-amber-700"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                portfolioLive ? "bg-[#163b0f]" : "bg-amber-500"
              }`}
            />
            {portfolioLive
              ? adminT("admin_portfolio_live_status")
              : adminT("admin_portfolio_offline_status")}
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          {
            labelKey: "admin_stat_total",
            value: totalCount,
            icon: Building2,
            iconColor: "text-[#163b0f]",
            iconBg: "bg-[#163b0f]/8",
          },
          {
            labelKey: "admin_stat_available",
            value: availableCount,
            icon: CheckSquare,
            iconColor: "text-emerald-600",
            iconBg: "bg-emerald-50",
          },
          {
            labelKey: "admin_stat_unread",
            value: UNREAD_INQUIRIES_COUNT,
            icon: MessageSquare,
            iconColor: "text-blue-600",
            iconBg: "bg-blue-50",
          },
        ].map(({ labelKey, value, icon: Icon, iconColor, iconBg }) => (
          <div
            key={labelKey}
            className="bg-white border border-[#e8e4df] rounded-xl p-5 hover:shadow-sm transition-shadow"
          >
            <div className={`w-9 h-9 ${iconBg} rounded-lg flex items-center justify-center mb-4`}>
              <Icon size={15} className={iconColor} />
            </div>
            <p className="text-2xl font-sans font-semibold text-[#1a1a1a] tracking-tight">
              {value}
            </p>
            <p className="text-[11px] font-sans text-[#6b7280] mt-0.5">{adminT(labelKey)}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#e8e4df]">
          <p className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#9ca3af]">
            {adminT("admin_quick_actions")}
          </p>
        </div>
        {[
          {
            titleKey: "admin_manage_listings",
            descKey: "admin_manage_listings_desc",
            descParams: undefined as Record<string, string | number> | undefined,
            href: "/admin/listings",
          },
          {
            titleKey: "admin_review_inquiries",
            descKey: "admin_review_inquiries_desc",
            descParams: { count: UNREAD_INQUIRIES_COUNT },
            href: "/admin/inquiries",
          },
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="flex items-center justify-between px-6 py-4 hover:bg-[#f9f8f6] transition-colors border-b border-[#e8e4df] last:border-none group"
          >
            <div>
              <p className="text-sm font-sans font-medium text-[#1a1a1a] group-hover:text-[#163b0f] transition-colors">
                {adminT(item.titleKey)}
              </p>
              <p className="text-xs font-sans text-[#6b7280] mt-0.5">
                {adminT(item.descKey, item.descParams)}
              </p>
            </div>
            <span className="text-[#9ca3af] group-hover:text-[#163b0f] transition-colors text-lg">
              →
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
