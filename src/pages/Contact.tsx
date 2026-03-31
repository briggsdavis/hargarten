import { Mail, Phone, MapPin, ChevronDown } from "lucide-react"
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
            <h1 className="mb-12 font-serif text-6xl tracking-tighter text-primary md:text-8xl">
              {t("contact_title")}
            </h1>
            <p className="mb-16 max-w-md text-xl leading-relaxed text-primary/70">
              {t("contact_intro")}
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="mb-1 text-xs tracking-widest text-primary/40 uppercase">
                    {t("contact_email")}
                  </p>
                  <a
                    href="mailto:Contact@hargarten-properties.lu"
                    className="interactive font-serif text-xl transition-colors hover:text-primary/60"
                  >
                    Contact@hargarten-properties.lu
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <p className="mb-1 text-xs tracking-widest text-primary/40 uppercase">
                    {t("contact_phone")}
                  </p>
                  <a
                    href="tel:+35212345678"
                    className="interactive font-serif text-xl transition-colors hover:text-primary/60"
                  >
                    +352 123 456 78
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/5">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <p className="mb-1 text-xs tracking-widest text-primary/40 uppercase">
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
            className="border border-primary/5 bg-white p-12"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs tracking-widest text-primary/40 uppercase">
                    {t("contact_first_name")}
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-primary/20 bg-transparent py-2 transition-colors outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest text-primary/40 uppercase">
                    {t("contact_last_name")}
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-primary/20 bg-transparent py-2 transition-colors outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-widest text-primary/40 uppercase">
                  {t("contact_email_address")}
                </label>
                <input
                  type="email"
                  className="w-full border-b border-primary/20 bg-transparent py-2 transition-colors outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-widest text-primary/40 uppercase">
                  {t("contact_subject")}
                </label>
                <div className="relative">
                  <select className="w-full cursor-pointer appearance-none border-b border-primary/20 bg-transparent py-2 pr-8 transition-colors outline-none focus:border-primary">
                    <option className="bg-white text-primary">
                      {t("contact_subject_sale")}
                    </option>
                    <option className="bg-white text-primary">
                      {t("contact_subject_purchase")}
                    </option>
                    <option className="bg-white text-primary">
                      {t("contact_subject_location")}
                    </option>
                    <option className="bg-white text-primary">
                      {t("contact_subject_contract")}
                    </option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-primary/40"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-widest text-primary/40 uppercase">
                  {t("contact_message")}
                </label>
                <textarea
                  rows={4}
                  className="w-full resize-none border-b border-primary/20 bg-transparent py-2 transition-colors outline-none focus:border-primary"
                />
              </div>
              <button className="interactive w-full bg-primary py-4 text-xs font-bold tracking-widest text-parchment uppercase transition-colors hover:bg-primary/90">
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
        className="mx-auto mt-24 max-w-7xl text-sm text-primary/40 italic"
      >
        {t("about_process_slogan")}
      </motion.p>
    </div>
  )
}
