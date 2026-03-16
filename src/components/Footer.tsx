import { useCookieConsent } from "../context/CookieConsentContext"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

export const Footer = () => {
  const { t } = useLocale()
  const { openSettings } = useCookieConsent()

  const linkClass =
    "text-parchment/40 hover:text-parchment interactive text-xs tracking-widest uppercase transition-colors duration-200"

  const navItems = [
    { key: "nav_home", path: "/" },
    { key: "nav_about", path: "/about" },
    { key: "nav_portfolio", path: "/portfolio" },
    { key: "nav_services", path: "/services" },
    { key: "nav_contact", path: "/contact" },
  ]

  const legalItems = [
    { key: "footer_legal", path: "/legal" },
    { key: "footer_privacy", path: "/privacy" },
    { key: "footer_cookies", path: "/cookies" },
  ]

  return (
    <footer className="bg-primary text-parchment">
      {/* Top rule */}
      <div className="bg-parchment/10 h-px w-full" />

      {/* Wordmark zone */}
      <div className="border-parchment/10 border-b px-8 pt-16 pb-10 md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              className="text-parchment/90 font-serif leading-none tracking-tighter"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
            >
              {t("nav_brand")}
            </h2>
            <p className="text-parchment/40 mt-4 text-sm italic">
              {t("about_process_slogan")}
            </p>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 px-8 pt-10 pb-8 md:grid-cols-4 md:px-16">
        {/* Pages */}
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <LocaleLink key={item.key} to={item.path} className={linkClass}>
              {t(item.key)}
            </LocaleLink>
          ))}
        </nav>

        {/* Legal */}
        <nav className="flex flex-col gap-3">
          {legalItems.map((item) => (
            <LocaleLink key={item.key} to={item.path} className={linkClass}>
              {t(item.key)}
            </LocaleLink>
          ))}
          <button onClick={openSettings} className={`text-left ${linkClass}`}>
            {t("footer_cookie_settings")}
          </button>
        </nav>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <a
            href="mailto:Contact@hargarten-properties.lu"
            className={linkClass}
          >
            Contact@hargarten-properties.lu
          </a>
          <a href="tel:+352621699831" className={linkClass}>
            +352 621 699 831
          </a>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3">
          <p className="text-parchment/40 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Sarl-s
          </p>
        </div>
      </div>
    </footer>
  )
}
