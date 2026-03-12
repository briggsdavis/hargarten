import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { useParams } from "react-router"
import { MapPin, Maximize, Maximize2, Bed, Bath, X, ChevronLeft, ChevronRight } from "lucide-react"
import { PROPERTIES } from "../constants"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

const GALLERY = [
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/5824514/pexels-photo-5824514.jpeg?auto=compress&cs=tinysrgb&w=1600",
]

// Thumbnail versions for the carousel strip
const GALLERY_THUMBS = [
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=300",
  "https://images.pexels.com/photos/5824514/pexels-photo-5824514.jpeg?auto=compress&cs=tinysrgb&w=300",
]

// Clicking any image in the bento grid opens the lightbox at that index
const BENTO = [
  {
    src: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    col: "md:col-span-8",
    aspect: "aspect-video",
    idx: 0,
  },
  {
    src: "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=400",
    col: "md:col-span-4",
    aspect: "aspect-square",
    idx: 1,
  },
  {
    src: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400",
    col: "md:col-span-4",
    aspect: "aspect-square",
    idx: 2,
  },
  {
    src: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    col: "md:col-span-8",
    aspect: "aspect-video",
    idx: 3,
  },
]

function Lightbox({ startIndex, onClose }: { startIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(startIndex)
  const [direction, setDirection] = useState(0)

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1)
      setIndex(next)
    },
    [index],
  )

  const prev = useCallback(() => go((index - 1 + GALLERY.length) % GALLERY.length), [go, index])
  const next = useCallback(() => go((index + 1) % GALLERY.length), [go, index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      else if (e.key === "ArrowRight") next()
      else if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [prev, next, onClose])

  // Lock body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  }

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[500] bg-black/96 flex flex-col"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Top bar */}
      <div className="flex-none flex justify-between items-center px-8 py-5">
        <span className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-bold">
          {index + 1} <span className="text-white/20 mx-1">/</span> {GALLERY.length}
        </span>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white transition-colors interactive"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main image area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-16 min-h-0">
        {/* Prev */}
        <button
          onClick={prev}
          className="absolute left-4 z-10 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors interactive"
        >
          <ChevronLeft size={28} />
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            src={GALLERY[index]}
            className="max-h-full max-w-full object-contain select-none"
            draggable={false}
          />
        </AnimatePresence>

        {/* Next */}
        <button
          onClick={next}
          className="absolute right-4 z-10 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors interactive"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Bottom thumbnail carousel */}
      <div className="flex-none px-8 py-5">
        <div className="flex gap-3 overflow-x-auto pb-1 justify-center">
          {GALLERY_THUMBS.map((thumb, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`flex-shrink-0 w-20 h-14 overflow-hidden transition-all duration-300 interactive ${
                i === index
                  ? "ring-2 ring-white ring-offset-2 ring-offset-black opacity-100"
                  : "opacity-30 hover:opacity-60"
              }`}
            >
              <img src={thumb} className="w-full h-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      </div>
    </motion.div>,
    document.body,
  )
}

export const PropertyDetail = () => {
  const { t } = useLocale()
  const { id } = useParams()
  const property = PROPERTIES.find((p) => p.id === id)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)

  if (!property) return null

  return (
    <>
      <div className="min-h-screen bg-parchment">
        {/* Back button */}
        <div className="pt-32 px-8 md:px-24 mb-8">
          <LocaleLink
            to="/portfolio"
            className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-primary/50 hover:text-primary transition-colors interactive group"
          >
            <span className="border-b border-current pb-0.5 pt-2">{t("property_back")}</span>
          </LocaleLink>
        </div>

        {/* Hero — click to open lightbox at index 0 */}
        <section
          className="h-[70vh] relative overflow-hidden mx-8 md:mx-24 mb-20 group cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          <motion.img
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            src={property.image}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          {/* Expand hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
            <div className="flex items-center gap-2 text-white text-[10px] uppercase tracking-widest font-bold">
              <Maximize2 size={14} />
              {t("property_gallery")}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-8 md:px-24 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Details */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 text-primary/50 uppercase tracking-widest text-xs mb-4">
                  <MapPin size={14} />
                  {property.location}
                </div>
                <h1 className="text-5xl md:text-7xl font-serif text-primary mb-8">
                  {property.title}
                </h1>
                <p className="text-xl text-primary/70 leading-relaxed mb-12">
                  {property.description}
                </p>

                {/* Bento Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {BENTO.map(({ src, col, aspect, idx }) => (
                    <div
                      key={idx}
                      className={`${col} ${aspect} overflow-hidden relative group cursor-pointer`}
                      onClick={() => openLightbox(idx)}
                    >
                      <img
                        src={src}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                        <Maximize2
                          size={18}
                          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="sticky top-32 space-y-12"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-2">
                    {t("property_price")}
                  </p>
                  <p className="text-4xl font-serif">${property.price}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/5">
                    <Maximize size={20} className="mx-auto mb-2 text-primary/40" />
                    <p className="text-xs font-bold">{property.sqm}</p>
                    <p className="text-[8px] uppercase tracking-widest opacity-40">
                      {t("property_sqm")}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-primary/5">
                    <Bed size={20} className="mx-auto mb-2 text-primary/40" />
                    <p className="text-xs font-bold">{property.bedrooms}</p>
                    <p className="text-[8px] uppercase tracking-widest opacity-40">
                      {t("property_bed")}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-primary/5">
                    <Bath size={20} className="mx-auto mb-2 text-primary/40" />
                    <p className="text-xs font-bold">{property.bathrooms}</p>
                    <p className="text-[8px] uppercase tracking-widest opacity-40">
                      {t("property_bath")}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-4">
                    {t("property_amenities")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((a) => (
                      <span
                        key={a}
                        className="px-3 py-1 border border-primary/10 text-[10px] uppercase tracking-widest font-bold"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-primary/10">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] uppercase tracking-widest text-primary/40">
                      {t("property_status")}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {property.status}
                    </span>
                  </div>
                  <LocaleLink
                    to="/contact"
                    className="block w-full bg-primary text-parchment py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors interactive text-center"
                  >
                    {t("property_inquire")}
                  </LocaleLink>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && <Lightbox startIndex={lightboxIndex} onClose={closeLightbox} />}
      </AnimatePresence>
    </>
  )
}
