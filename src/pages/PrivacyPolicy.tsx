import { motion } from "motion/react"
import { useLocale } from "../i18n/LocaleContext"

export const PrivacyPolicy = () => {
  const { t } = useLocale()

  const rights = [
    "privacy_rights_access",
    "privacy_rights_rectification",
    "privacy_rights_erasure",
    "privacy_rights_restriction",
    "privacy_rights_portability",
    "privacy_rights_objection",
  ]

  const sections = [
    {
      title: "privacy_controller_title",
      content: ["privacy_controller_text"],
    },
    {
      title: "privacy_data_title",
      content: [
        "privacy_data_contact",
        "privacy_data_analytics",
        "privacy_data_server",
      ],
      list: true,
    },
    {
      title: "privacy_purpose_title",
      content: ["privacy_purpose_text"],
    },
    {
      title: "privacy_storage_title",
      content: ["privacy_storage_text"],
    },
    {
      title: "privacy_rights_title",
      content: ["privacy_rights_intro"],
      listItems: rights,
      after: "privacy_rights_outro",
    },
    {
      title: "privacy_hosting_title",
      content: ["privacy_hosting_text"],
    },
    {
      title: "privacy_third_party_title",
      content: ["privacy_third_party_text"],
    },
    {
      title: "privacy_cnpd_title",
      content: ["privacy_cnpd_text"],
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
          <h1 className="mb-4 font-serif text-6xl tracking-tighter text-primary md:text-8xl">
            {t("privacy_title")}
          </h1>
          <p className="mb-16 text-sm text-primary/40">
            {t("privacy_updated")}
          </p>
          <p className="mb-16 text-lg leading-relaxed text-primary/70">
            {t("privacy_intro")}
          </p>

          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="mb-4 font-serif text-2xl tracking-tight text-primary">
                  {t(s.title)}
                </h2>
                {s.content.map((key) =>
                  s.list ? (
                    <p
                      key={key}
                      className="mb-2 text-base leading-relaxed text-primary/70"
                    >
                      &bull; {t(key)}
                    </p>
                  ) : (
                    <p
                      key={key}
                      className="text-base leading-relaxed text-primary/70"
                    >
                      {t(key)}
                    </p>
                  ),
                )}
                {s.listItems && (
                  <ul className="mt-3 space-y-2">
                    {s.listItems.map((key) => (
                      <li
                        key={key}
                        className="text-base leading-relaxed text-primary/70"
                      >
                        &bull; {t(key)}
                      </li>
                    ))}
                  </ul>
                )}
                {s.after && (
                  <p className="mt-4 text-base leading-relaxed text-primary/70">
                    {t(s.after)}
                  </p>
                )}
              </section>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-24 text-sm text-primary/40 italic"
        >
          {t("about_process_slogan")}
        </motion.p>
      </div>
    </div>
  )
}
