import { motion } from "motion/react"
import { useLocale } from "../i18n/LocaleContext"

export const Impressum = () => {
  const { t } = useLocale()

  const sections = [
    { label: "legal_company_label", value: "Hargarten Properties Sarl-S" },
    {
      label: "legal_address_label",
      value: "16, Boulevard Hubert Clement\nL-4064 Esch-Alzette, Luxembourg",
    },
    {
      label: "legal_directors_label",
      value: "Samuel Hargarten & Laurent Hargarten",
    },
    {
      label: "legal_email_label",
      value: "Contact@hargarten-properties.lu",
      href: "mailto:Contact@hargarten-properties.lu",
    },
    {
      label: "legal_phone_label",
      value: "+352 621 699 831",
      href: "tel:+352621699831",
    },
    { label: "legal_rcs_label", value: null, fallback: "legal_rcs_text" },
    { label: "legal_vat_label", value: null, fallback: "legal_vat_text" },
    {
      label: "legal_hosting_label",
      value: null,
      fallback: "legal_hosting_text",
    },
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
            {t("legal_title")}
          </h1>

          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.label}>
                <h2 className="text-primary/40 mb-2 text-xs tracking-widest uppercase">
                  {t(s.label)}
                </h2>
                {s.value ? (
                  s.href ? (
                    <a
                      href={s.href}
                      className="text-primary hover:text-primary/60 font-serif text-xl transition-colors"
                    >
                      {s.value}
                    </a>
                  ) : (
                    <p className="text-primary font-serif text-xl whitespace-pre-line">
                      {s.value}
                    </p>
                  )
                ) : (
                  <p className="text-primary/70 text-lg">{t(s.fallback!)}</p>
                )}
              </section>
            ))}
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
