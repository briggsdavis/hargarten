import { motion } from "motion/react"
import { Mail, Phone, MapPin } from "lucide-react"

export const Contact = () => {
  return (
    <div className="pt-32 pb-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif text-primary mb-12 tracking-tighter">
              Get in Touch
            </h1>
            <p className="text-xl text-primary/70 mb-16 leading-relaxed max-w-md">
              We value discretion and direct communication. Reach out to our team for a private
              consultation regarding your real estate requirements.
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-full">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:contact@hargarten.lu"
                    className="text-xl font-serif hover:text-primary/60 transition-colors interactive"
                  >
                    contact@hargarten.lu
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-full">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+35212345678"
                    className="text-xl font-serif hover:text-primary/60 transition-colors interactive"
                  >
                    +352 123 456 78
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary/5 flex items-center justify-center rounded-full">
                  <MapPin size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-1">
                    Office
                  </p>
                  <p className="text-xl font-serif">
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
            className="bg-white p-12 border border-primary/5"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary/40">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-primary/20 py-2 focus:border-primary outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-primary/40">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-primary/20 py-2 focus:border-primary outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary/40">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-primary/20 py-2 focus:border-primary outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary/40">
                  Subject
                </label>
                <select className="w-full bg-transparent border-b border-primary/20 py-2 focus:border-primary outline-none transition-colors appearance-none">
                  <option>Property Inquiry</option>
                  <option>Legal Consultation</option>
                  <option>Management Request</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-primary/40">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b border-primary/20 py-2 focus:border-primary outline-none transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-primary text-parchment py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors interactive">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
