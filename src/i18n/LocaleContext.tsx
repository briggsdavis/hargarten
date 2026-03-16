import { createContext, useContext, useMemo } from "react"
import { useLocation, Link, type LinkProps } from "react-router"
import en from "./en.json"
import fr from "./fr.json"
import lb from "./lb.json"
import { defaultLocale, isLocale, type Locale } from "./locales"

type Messages = Record<string, string>
const messages: Record<Locale, Messages> = { en, fr, lb }

interface LocaleContextValue {
  locale: Locale
  t: (key: string, params?: Record<string, string | number>) => string
  localePath: (path: string) => string
  switchLocalePath: (newLocale: Locale) => string
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  t: (key) => key,
  localePath: (path) => path,
  switchLocalePath: () => "/",
})

export function useLocale() {
  return useContext(LocaleContext)
}

/** Strips the locale prefix from a pathname */
function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  if (segments[0] && isLocale(segments[0])) {
    return "/" + segments.slice(1).join("/")
  }
  return pathname
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  const locale = useMemo<Locale>(() => {
    const first = location.pathname.split("/").filter(Boolean)[0]
    return first && isLocale(first) ? first : defaultLocale
  }, [location.pathname])

  const t = useMemo(() => {
    const dict = messages[locale]
    const fallback = messages[defaultLocale]
    return (key: string, params?: Record<string, string | number>): string => {
      let str = dict[key] || fallback[key] || key
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          str = str.replaceAll(`{${k}}`, String(v))
        }
      }
      return str
    }
  }, [locale])

  const localePath = useMemo(() => {
    const prefix = locale === defaultLocale ? "" : `/${locale}`
    return (path: string): string => {
      const clean = path.startsWith("/") ? path : `/${path}`
      return `${prefix}${clean}`.replace(/\/$/, "") || "/"
    }
  }, [locale])

  const switchLocalePath = useMemo(() => {
    return (newLocale: Locale): string => {
      const bare = stripLocale(location.pathname)
      if (newLocale === defaultLocale) return bare || "/"
      return `/${newLocale}${bare}`
    }
  }, [location.pathname])

  return (
    <LocaleContext.Provider value={{ locale, t, localePath, switchLocalePath }}>
      {children}
    </LocaleContext.Provider>
  )
}

/** Drop-in replacement for <Link> that auto-prefixes the locale */
export function LocaleLink({ to, ...props }: LinkProps & { to: string }) {
  const { localePath } = useLocale()
  return <Link to={localePath(to)} {...props} />
}
