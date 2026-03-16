import { useState } from "react"
import { Plus, Pencil, Trash2, X, Upload, ImagePlus, Check, ChevronRight, ChevronLeft } from "lucide-react"
import { PROPERTIES } from "../../constants"
import { useAdmin } from "../../context/AdminContext"

// ─── Types ────────────────────────────────────────────────────────────────────

type AmenityOption = {
  en: string
  fr: string
  lb: string
}

type Property = {
  id: string
  title: string
  price: string
  sqm: string
  type: "Sale" | "Rent"
  status: "Available" | "Reserved"
  location: string
  bedrooms: number
  bathrooms: number
  image: string
  amenities: string[]
  description: string
}

type FormData = Omit<Property, "id"> & {
  title_fr: string
  title_lb: string
  description_fr: string
  description_lb: string
}

// ─── Known amenities (pre-seeded, with all three language translations) ───────

const SEED_AMENITIES: AmenityOption[] = [
  { en: "Concierge",               fr: "Conciergerie",              lb: "Conciergerie" },
  { en: "Double Garage",           fr: "Double Garage",             lb: "Doppel Garag" },
  { en: "Fireplace",               fr: "Cheminée",                  lb: "Kamin" },
  { en: "Floor-to-ceiling Windows",fr: "Fenêtres sol-plafond",      lb: "Buedefen-Fënsteren" },
  { en: "Guest House",             fr: "Maison d'hôtes",            lb: "Gasthaus" },
  { en: "Home Cinema",             fr: "Cinéma privé",              lb: "Heemkino" },
  { en: "Infinity Pool",           fr: "Piscine à débordement",     lb: "Infinity Pool" },
  { en: "Private Elevator",        fr: "Ascenseur privé",           lb: "Privat Lift" },
  { en: "Private Garden",          fr: "Jardin privé",              lb: "Privaten Gaart" },
  { en: "Roof Terrace",            fr: "Terrasse sur le toit",      lb: "Daachterras" },
  { en: "Smart Home",              fr: "Maison connectée",          lb: "Smart Home" },
  { en: "Wine Cellar",             fr: "Cave à vin",                lb: "Wäikeller" },
]

const EMPTY_FORM: FormData = {
  title: "",
  title_fr: "",
  title_lb: "",
  price: "",
  sqm: "",
  type: "Sale",
  status: "Available",
  location: "",
  bedrooms: 1,
  bathrooms: 1,
  image: "",
  amenities: [],
  description: "",
  description_fr: "",
  description_lb: "",
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[9px] uppercase tracking-[0.22em] font-sans font-bold text-[#9ca3af] mb-1.5">
    {children}
  </p>
)

const FieldHint = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-sans text-[#9ca3af] mt-1">{children}</p>
)

const LangInput = ({
  lang,
  flag,
  value,
  onChange,
  placeholder,
  multiline = false,
  required = false,
}: {
  lang: string
  flag: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  multiline?: boolean
  required?: boolean
}) => (
  <div className="flex gap-3 items-start">
    <div className="flex-shrink-0 mt-2.5 flex items-center gap-1.5">
      <span className="text-base leading-none">{flag}</span>
      <span className="text-[9px] uppercase tracking-widest font-sans font-bold text-[#9ca3af] w-5">
        {lang}
      </span>
    </div>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        required={required}
        className="flex-1 px-4 py-2.5 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors resize-none placeholder:text-[#c4c4c4] bg-white"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="flex-1 px-4 py-2.5 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors placeholder:text-[#c4c4c4] bg-white"
      />
    )}
  </div>
)

// ─── Main component ───────────────────────────────────────────────────────────

export const AdminListings = () => {
  const { adminT } = useAdmin()
  const [properties, setProperties] = useState<Property[]>(PROPERTIES as Property[])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [knownAmenities, setKnownAmenities] = useState<AmenityOption[]>(SEED_AMENITIES)
  const [newAmenity, setNewAmenity] = useState({ en: "", fr: "", lb: "" })
  const [showAddAmenity, setShowAddAmenity] = useState(false)

  // Steps are computed from translations so they update when language changes
  const STEPS = [
    {
      number: 1,
      title: adminT("admin_step1_title"),
      subtitle: adminT("admin_step1_subtitle"),
      hint: adminT("admin_step1_hint"),
    },
    {
      number: 2,
      title: adminT("admin_step2_title"),
      subtitle: adminT("admin_step2_subtitle"),
      hint: adminT("admin_step2_hint"),
    },
    {
      number: 3,
      title: adminT("admin_step3_title"),
      subtitle: adminT("admin_step3_subtitle"),
      hint: adminT("admin_step3_hint"),
    },
    {
      number: 4,
      title: adminT("admin_step4_title"),
      subtitle: adminT("admin_step4_subtitle"),
      hint: adminT("admin_step4_hint"),
    },
    {
      number: 5,
      title: adminT("admin_step5_title"),
      subtitle: adminT("admin_step5_subtitle"),
      hint: adminT("admin_step5_hint"),
    },
  ]

  const openAdd = () => {
    setFormData(EMPTY_FORM)
    setEditingId(null)
    setCurrentStep(1)
    setShowAddAmenity(false)
    setNewAmenity({ en: "", fr: "", lb: "" })
    setIsFormOpen(true)
  }

  const openEdit = (property: Property) => {
    const { id, ...rest } = property
    setFormData({
      ...rest,
      title_fr: "",
      title_lb: "",
      description_fr: "",
      description_lb: "",
    } as FormData)
    setEditingId(id)
    setCurrentStep(1)
    setShowAddAmenity(false)
    setNewAmenity({ en: "", fr: "", lb: "" })
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingId(null)
    setFormData(EMPTY_FORM)
    setCurrentStep(1)
    setShowAddAmenity(false)
    setNewAmenity({ en: "", fr: "", lb: "" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { title_fr: _tf, title_lb: _tl, description_fr: _df, description_lb: _dl, ...base } = formData
    if (editingId) {
      setProperties((prev) =>
        prev.map((p) => (p.id === editingId ? { ...base, id: editingId } : p)),
      )
    } else {
      setProperties((prev) => [...prev, { ...base, id: String(Date.now()) }])
    }
    closeForm()
  }

  const handleDelete = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id))
    setDeleteConfirmId(null)
  }

  const field = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }))

  const toggleAmenity = (en: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(en)
        ? prev.amenities.filter((a) => a !== en)
        : [...prev.amenities, en],
    }))
  }

  const addNewAmenity = () => {
    const { en, fr, lb } = newAmenity
    if (!en.trim() || !fr.trim() || !lb.trim()) return
    const newOpt = { en: en.trim(), fr: fr.trim(), lb: lb.trim() }
    setKnownAmenities((prev) => [...prev, newOpt])
    setFormData((prev) => ({ ...prev, amenities: [...prev.amenities, newOpt.en] }))
    setNewAmenity({ en: "", fr: "", lb: "" })
    setShowAddAmenity(false)
  }

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length))
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const stepInfo = STEPS[currentStep - 1]

  const noun = properties.length === 1
    ? adminT("admin_listings_noun_single")
    : adminT("admin_listings_noun_plural")

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#9ca3af] font-sans mb-1">
            {adminT("admin_management")}
          </p>
          <h2 className="text-2xl font-sans font-semibold text-[#1a1a1a] tracking-tight">
            {adminT("admin_listings_title")}
          </h2>
          <p className="text-sm font-sans text-[#6b7280] mt-1">
            {adminT("admin_listings_count", { count: properties.length, noun })}
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#163b0f] text-[#fbf6f1] px-5 py-2.5 text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#163b0f]/90 transition-colors rounded-sm"
        >
          <Plus size={13} />
          {adminT("admin_add_new")}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e8e4df] bg-[#f9f8f6]">
              {/* "Property" and "Location" column headers stay in English per requirement */}
              {["Property", "Location", adminT("admin_col_price"), adminT("admin_col_type"), adminT("admin_col_status"), ""].map((h, i) => (
                <th
                  key={i}
                  className="text-left px-5 py-3.5 text-[9px] uppercase tracking-widest text-[#9ca3af] font-sans font-bold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr
                key={property.id}
                className="border-b border-[#e8e4df] last:border-none hover:bg-[#fafaf8] transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-14 h-10 object-cover rounded-md flex-shrink-0 bg-[#f5f4f0]"
                    />
                    <span className="text-sm font-sans font-medium text-[#1a1a1a]">
                      {property.title}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm font-sans text-[#6b7280]">{property.location}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm font-sans font-medium text-[#1a1a1a]">
                    €{property.price}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-[10px] uppercase tracking-wider font-sans text-[#6b7280]">
                    {property.type === "Sale" ? adminT("admin_for_sale") : adminT("admin_for_rent")}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-sans font-semibold px-2.5 py-1 rounded-full ${
                      property.status === "Available"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        property.status === "Available" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    {property.status === "Available"
                      ? adminT("admin_status_available")
                      : adminT("admin_status_reserved")}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(property)}
                      title="Edit property"
                      className="p-2 text-[#9ca3af] hover:text-[#163b0f] hover:bg-[#163b0f]/5 rounded-md transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    {deleteConfirmId === property.id ? (
                      <div className="flex items-center gap-2 ml-1">
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="text-[10px] font-sans font-bold text-red-600 hover:underline"
                        >
                          {adminT("admin_confirm")}
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="text-[10px] font-sans text-[#6b7280] hover:underline"
                        >
                          {adminT("admin_cancel")}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(property.id)}
                        title="Delete property"
                        className="p-2 text-[#9ca3af] hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {properties.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm font-sans text-[#9ca3af]">{adminT("admin_no_properties")}</p>
            <button
              onClick={openAdd}
              className="mt-4 text-[10px] uppercase tracking-widest font-sans font-bold text-[#163b0f] hover:underline"
            >
              {adminT("admin_add_first")} →
            </button>
          </div>
        )}
      </div>

      {/* Full-screen Property Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-[#fbf6f1] flex flex-col overflow-hidden">

          {/* Top Bar */}
          <div className="flex-shrink-0 bg-white border-b border-[#e8e4df] px-6 md:px-10 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Hargarten Properties" className="h-8 w-auto object-contain" />
              <div className="w-px h-6 bg-[#e8e4df]" />
              <div>
                <p className="text-[9px] uppercase tracking-widest text-[#9ca3af] font-sans">
                  {editingId ? adminT("admin_editing_listing") : adminT("admin_creating_listing")}
                </p>
                <p className="text-sm font-sans font-semibold text-[#1a1a1a] leading-tight">
                  {editingId ? (formData.title || adminT("admin_col_property")) : adminT("admin_new_property")}
                </p>
              </div>
            </div>
            <button
              onClick={closeForm}
              className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-sans font-bold text-[#6b7280] hover:text-[#1a1a1a] transition-colors px-4 py-2 border border-[#e8e4df] hover:border-[#1a1a1a] bg-white"
            >
              <X size={13} />
              {adminT("admin_cancel")}
            </button>
          </div>

          {/* Step Progress Bar */}
          <div className="flex-shrink-0 bg-white border-b border-[#e8e4df] px-6 md:px-10 py-4">
            <div className="flex items-start max-w-3xl">
              {STEPS.map((step, idx) => (
                <div key={step.number} className="flex-1 flex flex-col items-center relative">
                  {idx > 0 && (
                    <div
                      className={`absolute top-3 right-1/2 w-full h-px transition-colors ${
                        currentStep > idx ? "bg-[#163b0f]/30" : "bg-[#e8e4df]"
                      }`}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setCurrentStep(step.number)}
                    className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-sans font-bold transition-all flex-shrink-0"
                    style={{
                      background:
                        currentStep === step.number
                          ? "#163b0f"
                          : currentStep > step.number
                          ? "rgba(22,59,15,0.15)"
                          : "#e8e4df",
                      color:
                        currentStep === step.number
                          ? "#fff"
                          : currentStep > step.number
                          ? "#163b0f"
                          : "#9ca3af",
                    }}
                  >
                    {currentStep > step.number ? <Check size={11} /> : step.number}
                  </button>
                  <span
                    className={`mt-1.5 text-[9px] uppercase tracking-wider font-sans font-bold text-center hidden md:block transition-colors leading-tight ${
                      currentStep === step.number ? "text-[#163b0f]" : "text-[#9ca3af]"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scrollable Content */}
          <form
            id="property-form"
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto"
          >
            <div className="max-w-3xl mx-auto px-6 md:px-0 py-10">

              {/* Step header */}
              <div className="mb-8">
                <p className="text-[9px] uppercase tracking-[0.25em] font-sans font-bold text-[#9ca3af] mb-2">
                  {adminT("admin_step_of", { current: stepInfo.number, total: STEPS.length })}
                </p>
                <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a1a] tracking-tight mb-2">
                  {stepInfo.title}
                </h2>
                <p className="text-sm font-sans text-[#6b7280] leading-relaxed max-w-xl">
                  {stepInfo.subtitle}
                </p>
                <div className="mt-4 px-4 py-3 bg-[#163b0f]/5 border border-[#163b0f]/10 rounded-lg">
                  <p className="text-[11px] font-sans text-[#163b0f] leading-relaxed">
                    <span className="font-bold uppercase tracking-wider">{adminT("admin_tip")}: </span>
                    {stepInfo.hint}
                  </p>
                </div>
              </div>

              {/* STEP 1: Hero Photo */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <SectionLabel>{adminT("admin_hero_image")}</SectionLabel>
                    <div className="border-2 border-dashed border-[#e8e4df] rounded-xl overflow-hidden hover:border-[#163b0f]/40 transition-colors group cursor-pointer bg-white">
                      {formData.image ? (
                        <div className="relative">
                          <img
                            src={formData.image}
                            alt="Hero preview"
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-2 text-white text-sm font-sans font-medium">
                              <Upload size={16} />
                              {adminT("admin_click_replace")}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-16 flex flex-col items-center gap-4 text-center px-8">
                          <div className="w-16 h-16 rounded-full bg-[#f5f4f0] flex items-center justify-center">
                            <Upload size={22} className="text-[#9ca3af]" />
                          </div>
                          <div>
                            <p className="text-base font-sans font-semibold text-[#1a1a1a]">
                              {adminT("admin_upload_hero")}
                            </p>
                            <p className="text-sm font-sans text-[#9ca3af] mt-1">
                              {adminT("admin_jpg_png")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <FieldHint>{adminT("admin_hero_hint")}</FieldHint>
                  </div>

                  <div>
                    <SectionLabel>{adminT("admin_gallery_images")}</SectionLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square border-2 border-dashed border-[#e8e4df] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#163b0f]/30 hover:bg-[#f9f8f6] transition-all group cursor-pointer bg-white"
                        >
                          <ImagePlus
                            size={20}
                            className="text-[#c4c4c4] group-hover:text-[#163b0f]/40 transition-colors"
                          />
                          <span className="text-[9px] uppercase tracking-wider font-sans text-[#c4c4c4] group-hover:text-[#9ca3af]">
                            {adminT("admin_add_photo")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <FieldHint>{adminT("admin_gallery_hint")}</FieldHint>
                  </div>
                </div>
              )}

              {/* STEP 2: Property Information */}
              {currentStep === 2 && (
                <div className="space-y-7">

                  {/* Property Name - multilingual. Label stays in English per requirement */}
                  <div>
                    <SectionLabel>Property Name — in all three languages (required)</SectionLabel>
                    <p className="text-xs font-sans text-[#6b7280] mb-3">
                      {adminT("admin_prop_name_hint")}
                    </p>
                    <div className="space-y-2.5 bg-white border border-[#e5e7eb] rounded-lg p-4">
                      <LangInput
                        lang="EN"
                        flag="🇬🇧"
                        value={formData.title}
                        onChange={(v) => field("title", v)}
                        placeholder="e.g. The Penthouse Suite"
                        required
                      />
                      <div className="h-px bg-[#f0ede9]" />
                      <LangInput
                        lang="LB"
                        flag="🇱🇺"
                        value={formData.title_lb}
                        onChange={(v) => field("title_lb", v)}
                        placeholder="e.g. D'Penthouse Suite"
                        required
                      />
                      <div className="h-px bg-[#f0ede9]" />
                      <LangInput
                        lang="FR"
                        flag="🇫🇷"
                        value={formData.title_fr}
                        onChange={(v) => field("title_fr", v)}
                        placeholder="e.g. La Suite Penthouse"
                        required
                      />
                    </div>
                  </div>

                  {/* Location - label stays in English per requirement */}
                  <div>
                    <SectionLabel>Location (required)</SectionLabel>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => field("location", e.target.value)}
                      placeholder="e.g. Kirchberg, Luxembourg"
                      required
                      className="w-full px-4 py-3 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors placeholder:text-[#c4c4c4] bg-white rounded-lg"
                    />
                    <FieldHint>Enter the neighbourhood and city, e.g. "Limpertsberg, Luxembourg City".</FieldHint>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Price */}
                    <div>
                      <SectionLabel>{adminT("admin_asking_price")}</SectionLabel>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6b7280] font-sans">€</span>
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) => field("price", e.target.value)}
                          placeholder="e.g. 2.5M or 3500/mo"
                          required
                          className="w-full pl-8 pr-4 py-3 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors placeholder:text-[#c4c4c4] bg-white rounded-lg"
                        />
                      </div>
                      <FieldHint>{adminT("admin_price_hint")}</FieldHint>
                    </div>

                    {/* Status */}
                    <div>
                      <SectionLabel>{adminT("admin_availability")}</SectionLabel>
                      <button
                        type="button"
                        onClick={() =>
                          field("status", formData.status === "Available" ? "Reserved" : "Available")
                        }
                        className={`w-full flex items-center justify-between px-4 py-3 border text-sm font-sans font-medium transition-all rounded-lg ${
                          formData.status === "Available"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-amber-200 bg-amber-50 text-amber-700"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              formData.status === "Available" ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          {formData.status === "Available"
                            ? adminT("admin_status_available")
                            : adminT("admin_status_reserved")}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider opacity-60">
                          {adminT("admin_click_toggle")}
                        </span>
                      </button>
                      <FieldHint>{adminT("admin_available_reserved_hint")}</FieldHint>
                    </div>
                  </div>

                  {/* Transaction Type */}
                  <div>
                    <SectionLabel>{adminT("admin_transaction_type")}</SectionLabel>
                    <div className="flex border border-[#e5e7eb] overflow-hidden rounded-lg">
                      {(["Sale", "Rent"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => field("type", t)}
                          className={`flex-1 py-3 text-[10px] uppercase tracking-widest font-sans font-bold transition-all ${
                            formData.type === t
                              ? "bg-[#163b0f] text-[#fbf6f1]"
                              : "bg-white text-[#6b7280] hover:bg-[#f9f8f6]"
                          }`}
                        >
                          {t === "Sale" ? adminT("admin_for_sale") : adminT("admin_for_rent")}
                        </button>
                      ))}
                    </div>
                    <FieldHint>{adminT("admin_transaction_hint")}</FieldHint>
                  </div>
                </div>
              )}

              {/* STEP 3: Specifications */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      {
                        labelKey: "admin_bedrooms",
                        key: "bedrooms" as const,
                        suffixKey: "admin_rooms_suffix",
                        type: "number",
                        hintKey: "admin_bedrooms_hint",
                        placeholder: "e.g. 3",
                      },
                      {
                        labelKey: "admin_bathrooms",
                        key: "bathrooms" as const,
                        suffixKey: "admin_baths_suffix",
                        type: "number",
                        hintKey: "admin_bathrooms_hint",
                        placeholder: "e.g. 2",
                      },
                      {
                        labelKey: "admin_surface",
                        key: "sqm" as const,
                        suffixKey: "admin_sqm_suffix",
                        type: "text",
                        hintKey: "admin_surface_hint",
                        placeholder: "e.g. 142.5",
                      },
                    ].map(({ labelKey, key, suffixKey, type, hintKey, placeholder }) => (
                      <div key={key}>
                        <SectionLabel>{adminT(labelKey)}</SectionLabel>
                        <div className="relative">
                          <input
                            type={type}
                            value={formData[key]}
                            onChange={(e) =>
                              field(key, type === "number" ? Number(e.target.value) : e.target.value)
                            }
                            min={type === "number" ? 0 : undefined}
                            placeholder={placeholder}
                            className="w-full px-4 pr-12 py-3 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors placeholder:text-[#c4c4c4] bg-white rounded-lg"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#9ca3af] font-sans uppercase tracking-wider">
                            {adminT(suffixKey)}
                          </span>
                        </div>
                        <FieldHint>{adminT(hintKey)}</FieldHint>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Description */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <SectionLabel>{adminT("admin_desc_section")}</SectionLabel>
                    <p className="text-xs font-sans text-[#6b7280] mb-3">
                      {adminT("admin_desc_hint_text")}
                    </p>
                    <div className="space-y-2.5 bg-white border border-[#e5e7eb] rounded-lg p-4">
                      <LangInput
                        lang="EN"
                        flag="🇬🇧"
                        value={formData.description}
                        onChange={(v) => field("description", v)}
                        placeholder="e.g. A masterpiece of modern architecture offering horizon-deep views and expansive ceilings."
                        multiline
                        required
                      />
                      <div className="h-px bg-[#f0ede9]" />
                      <LangInput
                        lang="LB"
                        flag="🇱🇺"
                        value={formData.description_lb}
                        onChange={(v) => field("description_lb", v)}
                        placeholder="e.g. E Meeschterwierk vun der moderner Architektur mat wäitem Horizont an héije Plaffong."
                        multiline
                        required
                      />
                      <div className="h-px bg-[#f0ede9]" />
                      <LangInput
                        lang="FR"
                        flag="🇫🇷"
                        value={formData.description_fr}
                        onChange={(v) => field("description_fr", v)}
                        placeholder="e.g. Un chef-d'oeuvre d'architecture moderne offrant des vues infinies et des plafonds généreux."
                        multiline
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Amenities */}
              {currentStep === 5 && (
                <div className="space-y-6">

                  <div>
                    <SectionLabel>
                      {adminT("admin_amenities_selected", { count: formData.amenities.length })}
                    </SectionLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                      {knownAmenities.map((amenity) => {
                        const selected = formData.amenities.includes(amenity.en)
                        return (
                          <button
                            key={amenity.en}
                            type="button"
                            onClick={() => toggleAmenity(amenity.en)}
                            className={`flex items-center justify-between gap-2 px-4 py-3 border rounded-lg text-left transition-all ${
                              selected
                                ? "border-[#163b0f] bg-[#163b0f]/5 text-[#163b0f]"
                                : "border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#163b0f]/30 hover:bg-[#f9f8f6]"
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="text-[11px] font-sans font-semibold leading-tight truncate">
                                {amenity.en}
                              </p>
                              <p className="text-[9px] font-sans text-current opacity-60 mt-0.5 truncate">
                                {amenity.fr} · {amenity.lb}
                              </p>
                            </div>
                            <span
                              className={`flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                selected
                                  ? "bg-[#163b0f] border-[#163b0f]"
                                  : "border-[#d1d5db] bg-white"
                              }`}
                            >
                              {selected && <Check size={9} className="text-white" />}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Add new amenity */}
                  <div className="border border-[#e8e4df] rounded-xl bg-white overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowAddAmenity((v) => !v)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f9f8f6] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-[#163b0f]/8 flex items-center justify-center">
                          <Plus size={11} className="text-[#163b0f]" />
                        </div>
                        <div>
                          <p className="text-sm font-sans font-semibold text-[#1a1a1a]">
                            {adminT("admin_add_amenity_heading")}
                          </p>
                          <p className="text-[11px] font-sans text-[#9ca3af]">
                            {adminT("admin_add_amenity_subtitle")}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={15}
                        className={`text-[#9ca3af] transition-transform ${showAddAmenity ? "rotate-90" : ""}`}
                      />
                    </button>

                    {showAddAmenity && (
                      <div className="border-t border-[#e8e4df] px-5 py-5 bg-[#fafaf8]">
                        <p className="text-xs font-sans text-[#6b7280] mb-4">
                          {adminT("admin_add_amenity_desc")}
                        </p>
                        <div className="space-y-2.5 bg-white border border-[#e5e7eb] rounded-lg p-4 mb-4">
                          {[
                            { lang: "EN", flag: "🇬🇧", key: "en" as const, placeholder: "e.g. Heated Floors" },
                            { lang: "LB", flag: "🇱🇺", key: "lb" as const, placeholder: "e.g. Geheizte Buedem" },
                            { lang: "FR", flag: "🇫🇷", key: "fr" as const, placeholder: "e.g. Plancher chauffant" },
                          ].map(({ lang, flag, key, placeholder }) => (
                            <div key={key}>
                              <LangInput
                                lang={lang}
                                flag={flag}
                                value={newAmenity[key]}
                                onChange={(v) => setNewAmenity((prev) => ({ ...prev, [key]: v }))}
                                placeholder={placeholder}
                              />
                              {key !== "fr" && <div className="h-px bg-[#f0ede9] mt-2.5" />}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={addNewAmenity}
                            disabled={!newAmenity.en.trim() || !newAmenity.fr.trim() || !newAmenity.lb.trim()}
                            className="flex items-center gap-2 bg-[#163b0f] text-[#fbf6f1] px-5 py-2.5 text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#163b0f]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed rounded-sm"
                          >
                            <Plus size={11} />
                            {adminT("admin_add_amenity_button")}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddAmenity(false)
                              setNewAmenity({ en: "", fr: "", lb: "" })
                            }}
                            className="px-5 py-2.5 border border-[#e5e7eb] text-[#6b7280] text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#f5f4f0] transition-colors rounded-sm"
                          >
                            {adminT("admin_cancel")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </form>

          {/* Bottom Navigation Bar */}
          <div className="flex-shrink-0 bg-white border-t border-[#e8e4df] px-6 md:px-10 py-4 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-5 py-2.5 border border-[#e5e7eb] text-[#6b7280] text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#f5f4f0] transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
            >
              <ChevronLeft size={13} />
              {adminT("admin_previous")}
            </button>

            <p className="text-[10px] font-sans text-[#9ca3af] uppercase tracking-wider hidden md:block">
              {adminT("admin_step_of", { current: currentStep, total: STEPS.length })}
            </p>

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={goNext}
                className="flex items-center gap-2 bg-[#163b0f] text-[#fbf6f1] px-6 py-2.5 text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#163b0f]/90 transition-colors rounded-sm"
              >
                {adminT("admin_next_step")}
                <ChevronRight size={13} />
              </button>
            ) : (
              <button
                type="submit"
                form="property-form"
                className="flex items-center gap-2 bg-[#163b0f] text-[#fbf6f1] px-6 py-2.5 text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#163b0f]/90 transition-colors rounded-sm"
              >
                <Check size={13} />
                {editingId ? adminT("admin_save_changes") : adminT("admin_create_listing")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
