import { motion } from "motion/react"
import { useCookieConsent } from "../context/CookieConsentContext"
import { useLocale } from "../i18n/LocaleContext"

export const CookiePolicy = () => {
  const { t } = useLocale()
  const { openSettings } = useCookieConsent()

  const sections = [
    { title: "cookiepolicy_what_title", text: "cookiepolicy_what_text" },
    {
      title: "cookiepolicy_essential_title",
      text: "cookiepolicy_essential_text",
    },
    {
      title: "cookiepolicy_analytics_title",
      text: "cookiepolicy_analytics_text",
    },
    { title: "cookiepolicy_manage_title", text: "cookiepolicy_manage_text" },
    { title: "cookiepolicy_changes_title", text: "cookiepolicy_changes_text" },
  ]

  return (
    <div className="px-8 pt-32 pb-32 md:px-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-primary mb-16 font-serif text-6xl tracking-tighter md:text-8xl">
            {t("cookiepolicy_title")}
          </h1>
          <p className="text-primary/70 mb-16 text-lg leading-relaxed">
            {t("cookiepolicy_intro")}
          </p>

          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-primary mb-4 font-serif text-2xl tracking-tight">
                  {t(s.title)}
                </h2>
                <p className="text-primary/70 text-base leading-relaxed">
                  {t(s.text)}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-12">
            <button
              onClick={openSettings}
              className="bg-primary text-parchment hover:bg-primary/90 interactive px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors"
            >
              {t("footer_cookie_settings")}
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-primary/40 mt-24 text-sm italic"
        >
          {t("about_process_slogan")}
        </motion.p>
      </div>
    </div>
  )
}
