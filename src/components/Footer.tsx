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
          <h2
            className="font-serif leading-none tracking-tighter text-parchment/90"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
          >
            {t("nav_brand")}
          </h2>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="px-8 md:px-16 py-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
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
        <p className="text-[10px] uppercase tracking-widest text-parchment/20 md:absolute md:left-1/2 md:-translate-x-1/2">
          &copy; {new Date().getFullYear()} Sarl-s
        </p>

        {/* Contact */}
        <div className="flex gap-8">
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
        </div>

        {/* Discrete admin entry */}
        <LocaleLink
          to="/admin/login"
          className="text-[10px] text-parchment/15 hover:text-parchment/40 transition-colors duration-300 interactive ml-4 self-end"
          style={{ fontSize: "10pt" }}
        >
          {t("footer_admin")}
        </LocaleLink>
      </div>
    </footer>
  )
}
