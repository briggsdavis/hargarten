import { Link } from "react-router"

export const Footer = () => {
  return (
    <footer className="bg-primary text-parchment">
      {/* Top rule */}
      <div className="h-px bg-parchment/10 w-full" />

      {/* Wordmark zone */}
      <div className="px-8 md:px-16 pt-16 pb-10 border-b border-parchment/10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2
            className="font-serif leading-none tracking-tighter text-parchment/90"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
          >
            Hargarten Properties
          </h2>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="px-8 md:px-16 py-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Nav */}
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {["Home", "About", "Portfolio", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-[10px] uppercase tracking-widest text-parchment/40 hover:text-parchment transition-colors duration-200 interactive"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[10px] uppercase tracking-widest text-parchment/20 md:absolute md:left-1/2 md:-translate-x-1/2">
          © {new Date().getFullYear()} Sàrl-s
        </p>

        {/* Contact */}
        <div className="flex gap-8">
          <a
            href="mailto:contact@hargarten.lu"
            className="text-[10px] uppercase tracking-widest text-parchment/40 hover:text-parchment transition-colors duration-200 interactive"
          >
            contact@hargarten.lu
          </a>
          <a
            href="tel:+35212345678"
            className="text-[10px] uppercase tracking-widest text-parchment/40 hover:text-parchment transition-colors duration-200 interactive"
          >
            +352 123 456 78
          </a>
        </div>
      </div>
    </footer>
  )
}
