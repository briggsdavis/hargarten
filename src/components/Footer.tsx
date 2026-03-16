import { useCookieConsent } from "../context/CookieConsentContext"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

export const Footer = () => {
  const { t } = useLocale()
  const { openSettings } = useCookieConsent()

  const navItems = [
    { key: "nav_home", path: "/" },
    { key: "nav_about", path: "/about" },
    { key: "nav_portfolio", path: "/portfolio" },
    { key: "nav_services", path: "/services" },
    { key: "nav_contact", path: "/contact" },
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

      {/* Bottom strip */}
      <div className="flex flex-col gap-6 px-8 py-7 md:grid md:grid-cols-3 md:items-center md:px-16">
        {/* Nav */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {navItems.map((item) => (
            <LocaleLink
              key={item.key}
              to={item.path}
              className="text-parchment/40 hover:text-parchment interactive text-[10px] tracking-widest uppercase transition-colors duration-200"
            >
              {t(item.key)}
            </LocaleLink>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-parchment/20 text-[10px] tracking-widest uppercase md:text-center">
          &copy; {new Date().getFullYear()} Sarl-s
        </p>

        {/* Contact + admin */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 md:items-center md:justify-end">
          <a
            href="mailto:Contact@hargarten-properties.lu"
            className="text-parchment/40 hover:text-parchment interactive text-[10px] tracking-widest uppercase transition-colors duration-200"
          >
            Contact@hargarten-properties.lu
          </a>
          <a
            href="tel:+35212345678"
            className="text-parchment/40 hover:text-parchment interactive text-[10px] tracking-widest uppercase transition-colors duration-200"
          >
            +352 123 456 78
          </a>
          <button
            onClick={openSettings}
            className="text-parchment/40 hover:text-parchment interactive text-[10px] tracking-widest uppercase transition-colors duration-200"
          >
            {t("footer_cookie_settings")}
          </button>
          <LocaleLink
            to="/admin/login"
            className="text-parchment/15 hover:text-parchment/40 interactive text-[10px] transition-colors duration-300"
          >
            {t("footer_admin")}
          </LocaleLink>
        </div>
      </div>
    </footer>
  )
}
