import { useLocale, LocaleLink } from "../i18n/LocaleContext"

export const Footer = () => {
  const { t } = useLocale()

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
      <div className="h-px bg-parchment/10 w-full" />

      {/* Wordmark zone */}
      <div className="px-8 md:px-16 pt-16 pb-10 border-b border-parchment/10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2
              className="font-serif leading-none tracking-tighter text-parchment/90"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
            >
              {t("nav_brand")}
            </h2>
            <p className="mt-4 text-sm italic text-parchment/40">{t("about_process_slogan")}</p>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="px-8 md:px-16 py-7 flex flex-col gap-6 md:grid md:grid-cols-3 md:items-center">
        {/* Nav */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {navItems.map((item) => (
            <LocaleLink
              key={item.key}
              to={item.path}
              className="text-[10px] uppercase tracking-widest text-parchment/40 hover:text-parchment transition-colors duration-200 interactive"
            >
              {t(item.key)}
            </LocaleLink>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[10px] uppercase tracking-widest text-parchment/20 md:text-center">
          &copy; {new Date().getFullYear()} Sarl-s
        </p>

        {/* Contact + admin */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end md:items-center">
          <a
            href="mailto:Contact@hargarten-properties.lu"
            className="text-[10px] uppercase tracking-widest text-parchment/40 hover:text-parchment transition-colors duration-200 interactive"
          >
            Contact@hargarten-properties.lu
          </a>
          <a
            href="tel:+35212345678"
            className="text-[10px] uppercase tracking-widest text-parchment/40 hover:text-parchment transition-colors duration-200 interactive"
          >
            +352 123 456 78
          </a>
          <LocaleLink
            to="/admin/login"
            className="text-[10px] text-parchment/15 hover:text-parchment/40 transition-colors duration-300 interactive"
          >
            {t("footer_admin")}
          </LocaleLink>
        </div>
      </div>
    </footer>
  )
}
