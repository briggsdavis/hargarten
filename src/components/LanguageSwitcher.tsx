import { Link } from "react-router"
import { useLocale } from "../i18n/LocaleContext"
import { locales, localeNames, type Locale } from "../i18n/locales"

export const LanguageSwitcher = ({
  className = "",
}: {
  className?: string
}) => {
  const { locale, switchLocalePath } = useLocale()

  return (
    <div className={`flex gap-2 ${className}`}>
      {locales.map((loc: Locale) => (
        <Link
          key={loc}
          to={switchLocalePath(loc)}
          className={`interactive text-[10px] font-bold tracking-widest uppercase transition-colors duration-200 ${
            loc === locale ? "opacity-100" : "opacity-40 hover:opacity-70"
          }`}
        >
          {localeNames[loc]}
        </Link>
      ))}
    </div>
  )
}
