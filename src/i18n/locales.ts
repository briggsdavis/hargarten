export const locales = ["en", "fr", "lb"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  lb: "LB",
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
