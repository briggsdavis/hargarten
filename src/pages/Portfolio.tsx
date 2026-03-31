import { ChevronDown, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useState, useRef, useEffect } from "react"
import { PROPERTIES } from "../constants"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

const MotionLocaleLink = motion(LocaleLink)

const ALL_AMENITIES = [
  "Balcony",
  "Cellar",
  "Elevator",
  "Garage",
  "Garden",
  "Parking",
  "Terrace",
]

const PillGroup = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}) => (
  <div className="flex flex-col gap-2">
    <span className="text-xs tracking-[0.2em] text-primary/40 uppercase">
      {label}
    </span>
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`interactive border px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
            value === opt
              ? "border-primary bg-primary text-parchment"
              : "border-primary/20 bg-transparent text-primary/50 hover:border-primary hover:text-primary"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
)

export const Portfolio = () => {
  const { t } = useLocale()
  const tAmenity = (a: string) => t(`amenity_${a.toLowerCase()}`)
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [minBedrooms, setMinBedrooms] = useState(0)
  const [maxSalePrice, setMaxSalePrice] = useState(6)
  const [maxRentPrice, setMaxRentPrice] = useState(10000)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [amenityOpen, setAmenityOpen] = useState(false)
  const amenityRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        amenityRef.current &&
        !amenityRef.current.contains(e.target as Node)
      ) {
        setAmenityOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const toggleAmenity = (a: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    )
  }

  const isRentMode = typeFilter === "Rent"

  const activeFilterCount = [
    statusFilter !== "All",
    typeFilter !== "All",
    minBedrooms > 0,
    maxSalePrice < 6,
    maxRentPrice < 10000,
    selectedAmenities.length > 0,
  ].filter(Boolean).length

  const clearAll = () => {
    setStatusFilter("All")
    setTypeFilter("All")
    setMinBedrooms(0)
    setMaxSalePrice(6)
    setMaxRentPrice(10000)
    setSelectedAmenities([])
  }

  const filtered = PROPERTIES.filter((p) => {
    if (statusFilter !== "All" && p.status !== statusFilter) return false
    if (typeFilter !== "All" && p.type !== typeFilter) return false
    if (p.bedrooms < minBedrooms) return false
    if (p.type === "Rent" && "monthlyRent" in p) {
      if ((p as typeof p & { monthlyRent: number }).monthlyRent > maxRentPrice)
        return false
    } else if (p.type === "Sale") {
      if (parseFloat(p.price.replace("M", "")) > maxSalePrice) return false
    }
    if (
      selectedAmenities.length > 0 &&
      !selectedAmenities.every((a) => p.amenities.includes(a))
    )
      return false
    return true
  })

  return (
    <div className="px-8 pt-32 pb-32 md:px-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14">
          <h1 className="mb-2 font-serif text-6xl text-primary">
            {t("portfolio_title")}
          </h1>
          <p className="text-xs tracking-widest text-primary/50 uppercase">
            {t("portfolio_subtitle", {
              year: String(new Date().getFullYear()),
            })}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-14 border-t border-b border-primary/10 py-6">
          {/* Row 1: Status, Transaction, Bedrooms, Amenities */}
          <div className="flex flex-wrap items-end gap-x-12 gap-y-6">
            <PillGroup
              label={t("portfolio_status")}
              options={[
                t("portfolio_all"),
                t("portfolio_available"),
                t("portfolio_reserved"),
              ]}
              value={
                statusFilter === "All"
                  ? t("portfolio_all")
                  : statusFilter === "Available"
                    ? t("portfolio_available")
                    : t("portfolio_reserved")
              }
              onChange={(v) => {
                if (v === t("portfolio_all")) setStatusFilter("All")
                else if (v === t("portfolio_available"))
                  setStatusFilter("Available")
                else setStatusFilter("Reserved")
              }}
            />
            <PillGroup
              label={t("portfolio_transaction")}
              options={[
                t("portfolio_all"),
                t("portfolio_rent"),
                t("portfolio_sale"),
              ]}
              value={
                typeFilter === "All"
                  ? t("portfolio_all")
                  : typeFilter === "Rent"
                    ? t("portfolio_rent")
                    : t("portfolio_sale")
              }
              onChange={(v) => {
                if (v === t("portfolio_all")) setTypeFilter("All")
                else if (v === t("portfolio_rent")) setTypeFilter("Rent")
                else setTypeFilter("Sale")
              }}
            />

            {/* Bedrooms */}
            <div className="flex flex-col gap-2">
              <span className="text-xs tracking-[0.2em] text-primary/40 uppercase">
                {t("portfolio_min_rooms")}
              </span>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setMinBedrooms(n)}
                    className={`interactive h-8 w-8 border text-xs font-bold transition-all duration-200 ${
                      minBedrooms === n
                        ? "border-primary bg-primary text-parchment"
                        : "border-primary/20 bg-transparent text-primary/50 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {n === 0 ? t("portfolio_any") : `${n}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities Dropdown */}
            <div className="flex flex-col gap-2" ref={amenityRef}>
              <span className="text-xs tracking-[0.2em] text-primary/40 uppercase">
                {t("portfolio_amenities")}
              </span>
              <div className="relative">
                <button
                  onClick={() => setAmenityOpen((v) => !v)}
                  className={`interactive flex items-center gap-3 border px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
                    selectedAmenities.length > 0
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-primary/20 text-primary/50 hover:border-primary hover:text-primary"
                  }`}
                >
                  {selectedAmenities.length > 0
                    ? t("portfolio_selected", {
                        count: String(selectedAmenities.length),
                      })
                    : t("portfolio_select")}
                  <motion.span
                    animate={{ rotate: amenityOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={12} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {amenityOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 z-20 mt-2 w-56 border border-primary/10 bg-white py-2 shadow-lg"
                    >
                      {ALL_AMENITIES.map((a) => (
                        <button
                          key={a}
                          onClick={() => toggleAmenity(a)}
                          className={`interactive flex w-full items-center justify-between px-4 py-2.5 text-left text-xs tracking-widest uppercase transition-colors ${
                            selectedAmenities.includes(a)
                              ? "bg-primary/5 font-bold text-primary"
                              : "text-primary/50 hover:bg-primary/3 hover:text-primary"
                          }`}
                        >
                          {tAmenity(a)}
                          {selectedAmenities.includes(a) && (
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Clear */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="interactive flex items-center gap-2 self-end text-xs tracking-widest text-primary/40 uppercase transition-colors hover:text-primary"
              >
                <X size={10} />
                {t("portfolio_clear_filters")}
              </button>
            )}
          </div>

          {/* Row 2: Price Slider */}
          <div className="mt-6 pt-6">
            {isRentMode ? (
              <div className="flex max-w-sm flex-col gap-2">
                <div className="flex justify-between text-xs tracking-[0.2em] text-primary/40 uppercase">
                  <span>{t("portfolio_max_price")} / mo</span>
                  <span className="font-bold text-primary">
                    {maxRentPrice === 10000
                      ? t("portfolio_any")
                      : `\u20AC${maxRentPrice.toLocaleString()}/mo`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={maxRentPrice}
                  onChange={(e) => setMaxRentPrice(parseInt(e.target.value))}
                  className="w-full cursor-pointer"
                />
                <div className="flex justify-between text-xs text-primary/30">
                  <span>&euro;0/mo</span>
                  <span>&euro;10,000+/mo</span>
                </div>
              </div>
            ) : (
              <div className="flex max-w-sm flex-col gap-2">
                <div className="flex justify-between text-xs tracking-[0.2em] text-primary/40 uppercase">
                  <span>{t("portfolio_max_price")}</span>
                  <span className="font-bold text-primary">
                    {maxSalePrice === 6
                      ? t("portfolio_any")
                      : maxSalePrice < 1
                        ? `\u20AC${Math.round(maxSalePrice * 1000)}K`
                        : `\u20AC${maxSalePrice}M`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.1"
                  value={maxSalePrice}
                  onChange={(e) => setMaxSalePrice(parseFloat(e.target.value))}
                  className="w-full cursor-pointer"
                />
                <div className="flex justify-between text-xs text-primary/30">
                  <span>&euro;0</span>
                  <span>&euro;6M+</span>
                </div>
              </div>
            )}
          </div>

          {/* Amenity chips - always visible, count pinned right */}
          <div className="mt-5 flex min-h-[2rem] flex-wrap items-center gap-2 border-t border-primary/10 pt-6">
            {selectedAmenities.map((a) => (
              <button
                key={a}
                onClick={() => toggleAmenity(a)}
                className="interactive flex items-center gap-2 bg-primary px-3 py-1 text-xs font-bold tracking-widest text-parchment uppercase transition-colors hover:bg-primary/80"
              >
                {tAmenity(a)}
                <X size={8} />
              </button>
            ))}
            <span className="ml-auto text-xs tracking-widest text-primary/30 uppercase">
              {filtered.length === 1
                ? t("portfolio_property", { count: String(filtered.length) })
                : t("portfolio_properties", { count: String(filtered.length) })}
            </span>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((prop) => (
              <MotionLocaleLink
                key={prop.id}
                to={`/portfolio/${prop.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group interactive"
              >
                <div className="relative mb-6 aspect-[4/5] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src={prop.image}
                    alt={prop.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-parchment/90 px-3 py-1 text-xs font-bold tracking-widest text-primary uppercase backdrop-blur-sm">
                    {prop.status === "Available"
                      ? t("portfolio_available")
                      : t("portfolio_reserved")}
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif text-base tracking-tight">
                      {prop.title}
                    </h3>
                    <p className="mt-0.5 text-xs tracking-widest text-primary/40 uppercase">
                      {prop.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary/70">
                      ${prop.price}
                    </p>
                    <p className="mt-0.5 text-xs tracking-widest text-primary/30 uppercase">
                      {prop.sqm} {t("portfolio_sqm")} / {prop.bedrooms}{" "}
                      {t("portfolio_bed")}
                    </p>
                  </div>
                </div>
              </MotionLocaleLink>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <p className="mb-6 font-serif text-2xl text-primary/40 italic">
              {t("portfolio_no_match")}
            </p>
            <button
              onClick={clearAll}
              className="interactive border-b border-primary/20 pb-1 text-xs font-bold tracking-widest text-primary/50 uppercase transition-colors hover:border-primary hover:text-primary"
            >
              {t("portfolio_clear_all")}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
