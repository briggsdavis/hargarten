import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { useCookieConsent } from "../context/CookieConsentContext"
import { useLocale } from "../i18n/LocaleContext"

export const CookieConsent = () => {
  const { showBanner, accept, reject } = useCookieConsent()
  const { t } = useLocale()
  const [showDetails, setShowDetails] = useState(false)

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-primary text-parchment border-parchment/10 fixed right-0 bottom-0 left-0 z-[9999] border-t"
        >
          <div className="px-8 py-6 md:px-16 md:py-8">
            {/* Main row */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              {/* Text */}
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-xs font-bold tracking-widest uppercase">
                  {t("cookie_title")}
                </p>
                <p className="text-parchment/70 text-sm leading-relaxed">
                  {t("cookie_description")}
                </p>
                <button
                  onClick={() => setShowDetails((d) => !d)}
                  className="text-parchment/40 hover:text-parchment interactive mt-2 text-xs tracking-widest uppercase underline underline-offset-2 transition-colors duration-200"
                >
                  {showDetails
                    ? t("cookie_hide_details")
                    : t("cookie_show_details")}
                </button>
              </div>

              {/* Buttons -- equal size, color, weight per CNPD */}
              <div className="flex shrink-0 gap-4">
                <button
                  onClick={reject}
                  className="border-parchment/40 text-parchment hover:bg-parchment hover:text-primary interactive border px-[18px] py-[9px] text-xs font-bold tracking-widest uppercase transition-all duration-300"
                >
                  {t("cookie_reject")}
                </button>
                <button
                  onClick={accept}
                  className="border-parchment/40 text-parchment hover:bg-parchment hover:text-primary interactive border px-[18px] py-[9px] text-xs font-bold tracking-widest uppercase transition-all duration-300"
                >
                  {t("cookie_accept")}
                </button>
              </div>
            </div>

            {/* Details panel (layer 2) */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-parchment/10 mt-6 grid gap-6 border-t pt-6 md:grid-cols-2">
                    {/* Essential */}
                    <div>
                      <p className="text-parchment/60 mb-1 text-xs font-bold tracking-widest uppercase">
                        {t("cookie_essential_title")}
                      </p>
                      <p className="text-parchment/40 text-xs leading-relaxed">
                        {t("cookie_essential_desc")}
                      </p>
                    </div>
                    {/* Analytics */}
                    <div>
                      <p className="text-parchment/60 mb-1 text-xs font-bold tracking-widest uppercase">
                        {t("cookie_analytics_title")}
                      </p>
                      <p className="text-parchment/40 text-xs leading-relaxed">
                        {t("cookie_analytics_desc")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
