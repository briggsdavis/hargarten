import { Mail, Phone, MapPin } from "lucide-react"
import { motion } from "motion/react"
import { useLocale } from "../i18n/LocaleContext"

export const Contact = () => {
  const { t } = useLocale()

  return (
    <div className="px-8 pt-32 pb-32 md:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-primary mb-12 font-serif text-6xl tracking-tighter md:text-8xl">
              {t("contact_title")}
            </h1>
            <p className="text-primary/70 mb-16 max-w-md text-xl leading-relaxed">
              {t("contact_intro")}
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="bg-primary/5 flex h-12 w-12 items-center justify-center rounded-full">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-primary/40 mb-1 text-[10px] tracking-widest uppercase">
                    {t("contact_email")}
                  </p>
                  <a
                    href="mailto:Contact@hargarten-properties.lu"
                    className="hover:text-primary/60 interactive font-serif text-xl transition-colors"
                  >
                    Contact@hargarten-properties.lu
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-primary/5 flex h-12 w-12 items-center justify-center rounded-full">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-primary/40 mb-1 text-[10px] tracking-widest uppercase">
                    {t("contact_phone")}
                  </p>
                  <a
                    href="tel:+35212345678"
                    className="hover:text-primary/60 interactive font-serif text-xl transition-colors"
                  >
                    +352 123 456 78
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="bg-primary/5 flex h-12 w-12 items-center justify-center rounded-full">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-primary/40 mb-1 text-[10px] tracking-widest uppercase">
                    {t("contact_office")}
                  </p>
                  <p className="font-serif text-xl">
                    12, Rue de la Paix
                    <br />
                    L-1234 Luxembourg
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="border-primary/5 border bg-white p-12"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-primary/40 text-[10px] tracking-widest uppercase">
                    {t("contact_first_name")}
                  </label>
                  <input
                    type="text"
                    className="border-primary/20 focus:border-primary w-full border-b bg-transparent py-2 transition-colors outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-primary/40 text-[10px] tracking-widest uppercase">
                    {t("contact_last_name")}
                  </label>
                  <input
                    type="text"
                    className="border-primary/20 focus:border-primary w-full border-b bg-transparent py-2 transition-colors outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-primary/40 text-[10px] tracking-widest uppercase">
                  {t("contact_email_address")}
                </label>
                <input
                  type="email"
                  className="border-primary/20 focus:border-primary w-full border-b bg-transparent py-2 transition-colors outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-primary/40 text-[10px] tracking-widest uppercase">
                  {t("contact_subject")}
                </label>
                <select className="border-primary/20 focus:border-primary w-full appearance-none border-b bg-transparent py-2 transition-colors outline-none">
                  <option>{t("contact_subject_inquiry")}</option>
                  <option>{t("contact_subject_legal")}</option>
                  <option>{t("contact_subject_management")}</option>
                  <option>{t("contact_subject_other")}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-primary/40 text-[10px] tracking-widest uppercase">
                  {t("contact_message")}
                </label>
                <textarea
                  rows={4}
                  className="border-primary/20 focus:border-primary w-full resize-none border-b bg-transparent py-2 transition-colors outline-none"
                />
              </div>
              <button className="bg-primary text-parchment hover:bg-primary/90 interactive w-full py-4 text-xs font-bold tracking-widest uppercase transition-colors">
                {t("contact_send")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="text-primary/40 mx-auto mt-24 max-w-7xl text-sm italic"
      >
        {t("about_process_slogan")}
      </motion.p>
    </div>
  )
}
