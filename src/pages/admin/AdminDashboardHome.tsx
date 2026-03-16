import {
  Building2,
  MessageSquare,
  Eye,
  EyeOff,
  CheckSquare,
} from "lucide-react"
import { PROPERTIES } from "../../constants"
import { useAdmin } from "../../context/AdminContext"

const UNREAD_INQUIRIES_COUNT = 3

export const AdminDashboardHome = () => {
  const { portfolioLive, setPortfolioLive, adminT } = useAdmin()

  const availableCount = PROPERTIES.filter(
    (p) => p.status === "Available",
  ).length
  const totalCount = PROPERTIES.length

  return (
    <div className="max-w-4xl p-8">
      {/* Page Header */}
      <div className="mb-10">
        <p className="mb-1 font-sans text-xs tracking-widest text-[#9ca3af] uppercase">
          {adminT("admin_overview")}
        </p>
        <h2 className="font-sans text-2xl font-semibold tracking-tight text-[#1a1a1a]">
          {adminT("admin_dashboard_title")}
        </h2>
        <p className="mt-1 font-sans text-sm text-[#6b7280]">
          {adminT("admin_dashboard_subtitle")}
        </p>
      </div>

      {/* Portfolio Visibility Toggle */}
      <div
        className={`mb-8 rounded-xl border-2 p-6 transition-all duration-500 ${
          portfolioLive
            ? "border-[#163b0f]/20 bg-[#163b0f]/[0.04]"
            : "border-amber-200 bg-amber-50"
        }`}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              {portfolioLive ? (
                <Eye size={15} className="text-[#163b0f]" />
              ) : (
                <EyeOff size={15} className="text-amber-600" />
              )}
              <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#6b7280] uppercase">
                {adminT("admin_portfolio_visibility")}
              </span>
            </div>

            <h3 className="mb-1.5 font-sans text-lg font-semibold tracking-tight text-[#1a1a1a]">
              {portfolioLive
                ? adminT("admin_portfolio_live_title")
                : adminT("admin_portfolio_hidden_title")}
            </h3>

            <p className="font-sans text-sm leading-relaxed text-[#6b7280]">
              {portfolioLive
                ? adminT("admin_portfolio_live_desc")
                : adminT("admin_portfolio_hidden_desc")}
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex flex-shrink-0 flex-col items-center gap-2">
            <button
              onClick={() => setPortfolioLive(!portfolioLive)}
              className={`relative h-7 w-14 rounded-full transition-all duration-400 focus:outline-none ${
                portfolioLive ? "bg-[#163b0f]" : "bg-[#d1d5db]"
              }`}
              aria-label="Toggle portfolio visibility"
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${
                  portfolioLive ? "left-8" : "left-1"
                }`}
              />
            </button>
            <span
              className={`font-sans text-xs font-bold tracking-widest uppercase ${
                portfolioLive ? "text-[#163b0f]" : "text-[#9ca3af]"
              }`}
            >
              {portfolioLive
                ? adminT("admin_portfolio_on")
                : adminT("admin_portfolio_off")}
            </span>
          </div>
        </div>

        {/* Status pill */}
        <div className="mt-5 flex items-center gap-2 border-t border-current/10 pt-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-semibold ${
              portfolioLive
                ? "bg-[#163b0f]/10 text-[#163b0f]"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
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
      <div className="mb-10 grid grid-cols-3 gap-4">
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
            className="rounded-xl border border-[#e8e4df] bg-white p-5 transition-shadow hover:shadow-sm"
          >
            <div
              className={`h-9 w-9 ${iconBg} mb-4 flex items-center justify-center rounded-lg`}
            >
              <Icon size={15} className={iconColor} />
            </div>
            <p className="font-sans text-2xl font-semibold tracking-tight text-[#1a1a1a]">
              {value}
            </p>
            <p className="mt-0.5 font-sans text-xs text-[#6b7280]">
              {adminT(labelKey)}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="overflow-hidden rounded-xl border border-[#e8e4df] bg-white">
        <div className="border-b border-[#e8e4df] px-6 py-4">
          <p className="font-sans text-xs font-bold tracking-widest text-[#9ca3af] uppercase">
            {adminT("admin_quick_actions")}
          </p>
        </div>
        {[
          {
            titleKey: "admin_manage_listings",
            descKey: "admin_manage_listings_desc",
            descParams: undefined as
              | Record<string, string | number>
              | undefined,
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
            className="group flex items-center justify-between border-b border-[#e8e4df] px-6 py-4 transition-colors last:border-none hover:bg-[#f9f8f6]"
          >
            <div>
              <p className="font-sans text-sm font-medium text-[#1a1a1a] transition-colors group-hover:text-[#163b0f]">
                {adminT(item.titleKey)}
              </p>
              <p className="mt-0.5 font-sans text-xs text-[#6b7280]">
                {adminT(item.descKey, item.descParams)}
              </p>
            </div>
            <span className="text-lg text-[#9ca3af] transition-colors group-hover:text-[#163b0f]">
              →
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
