import {
  MapPin,
  Maximize,
  Maximize2,
  Bed,
  Bath,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import { useParams } from "react-router"
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

function Lightbox({
  startIndex,
  onClose,
}: {
  startIndex: number
  onClose: () => void
}) {
  const [index, setIndex] = useState(startIndex)
  const [direction, setDirection] = useState(0)

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1)
      setIndex(next)
    },
    [index],
  )

  const prev = useCallback(
    () => go((index - 1 + GALLERY.length) % GALLERY.length),
    [go, index],
  )
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
      className="fixed inset-0 z-[500] flex flex-col bg-black/96"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Top bar */}
      <div className="flex flex-none items-center justify-between px-8 py-5">
        <span className="text-xs font-bold tracking-[0.25em] text-white/40 uppercase">
          {index + 1} <span className="mx-1 text-white/20">/</span>{" "}
          {GALLERY.length}
        </span>
        <button
          onClick={onClose}
          className="interactive text-white/50 transition-colors hover:text-white"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main image area */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-16">
        {/* Prev */}
        <button
          onClick={prev}
          className="interactive absolute left-4 z-10 flex h-10 w-10 items-center justify-center text-white/50 transition-colors hover:text-white"
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
          className="interactive absolute right-4 z-10 flex h-10 w-10 items-center justify-center text-white/50 transition-colors hover:text-white"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Bottom thumbnail carousel */}
      <div className="flex-none px-8 py-5">
        <div className="flex justify-center gap-3 overflow-x-auto pb-1">
          {GALLERY_THUMBS.map((thumb, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`interactive h-14 w-20 flex-shrink-0 overflow-hidden transition-all duration-300 ${
                i === index
                  ? "opacity-100 ring-2 ring-white ring-offset-2 ring-offset-black"
                  : "opacity-30 hover:opacity-60"
              }`}
            >
              <img
                src={thumb}
                className="h-full w-full object-cover"
                draggable={false}
              />
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
      <div className="bg-parchment min-h-screen">
        {/* Back button */}
        <div className="mb-8 px-8 pt-32 md:px-24">
          <LocaleLink
            to="/portfolio"
            className="text-primary/50 hover:text-primary interactive group flex items-center gap-3 text-xs font-bold tracking-widest uppercase transition-colors"
          >
            <span className="border-b border-current pt-2 pb-0.5">
              {t("property_back")}
            </span>
          </LocaleLink>
        </div>

        {/* Hero - click to open lightbox at index 0 */}
        <section
          className="group relative mx-8 mb-20 h-[70vh] cursor-pointer overflow-hidden md:mx-24"
          onClick={() => openLightbox(0)}
        >
          <motion.img
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            src={property.image}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          {/* Expand hint */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-white uppercase">
              <Maximize2 size={14} />
              {t("property_gallery")}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-8 pb-32 md:px-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {/* Details */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-primary/50 mb-4 flex items-center gap-2 text-xs tracking-widest uppercase">
                  <MapPin size={14} />
                  {property.location}
                </div>
                <h1 className="text-primary mb-8 font-serif text-5xl md:text-7xl">
                  {property.title}
                </h1>
                <p className="text-primary/70 mb-12 text-xl leading-relaxed">
                  {property.description}
                </p>

                {/* Bento Gallery */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
                  {BENTO.map(({ src, col, aspect, idx }) => (
                    <div
                      key={idx}
                      className={`${col} ${aspect} group relative cursor-pointer overflow-hidden`}
                      onClick={() => openLightbox(idx)}
                    >
                      <img
                        src={src}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
                        <Maximize2
                          size={18}
                          className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
                  <p className="text-primary/40 mb-2 text-xs tracking-widest uppercase">
                    {t("property_price")}
                  </p>
                  <p className="font-serif text-4xl">${property.price}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-primary/5 p-4 text-center">
                    <Maximize
                      size={20}
                      className="text-primary/40 mx-auto mb-2"
                    />
                    <p className="text-xs font-bold">{property.sqm}</p>
                    <p className="text-xs tracking-widest uppercase opacity-40">
                      {t("property_sqm")}
                    </p>
                  </div>
                  <div className="bg-primary/5 p-4 text-center">
                    <Bed size={20} className="text-primary/40 mx-auto mb-2" />
                    <p className="text-xs font-bold">{property.bedrooms}</p>
                    <p className="text-xs tracking-widest uppercase opacity-40">
                      {t("property_bed")}
                    </p>
                  </div>
                  <div className="bg-primary/5 p-4 text-center">
                    <Bath size={20} className="text-primary/40 mx-auto mb-2" />
                    <p className="text-xs font-bold">{property.bathrooms}</p>
                    <p className="text-xs tracking-widest uppercase opacity-40">
                      {t("property_bath")}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-primary/40 mb-4 text-xs tracking-widest uppercase">
                    {t("property_amenities")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((a) => (
                      <span
                        key={a}
                        className="border-primary/10 border px-3 py-1 text-xs font-bold tracking-widest uppercase"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-primary/10 border-t pt-8">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-primary/40 text-xs tracking-widest uppercase">
                      {t("property_status")}
                    </span>
                    <span className="text-xs font-bold tracking-widest uppercase">
                      {property.status === "Available" ? t("portfolio_available") : t("portfolio_reserved")}
                    </span>
                  </div>
                  <LocaleLink
                    to="/contact"
                    className="bg-primary text-parchment hover:bg-primary/90 interactive block w-full py-4 text-center text-xs font-bold tracking-widest uppercase transition-colors"
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
        {lightboxIndex !== null && (
          <Lightbox startIndex={lightboxIndex} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </>
  )
}
