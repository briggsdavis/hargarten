import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  ImagePlus,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { useState } from "react"
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
  { en: "Concierge", fr: "Conciergerie", lb: "Conciergerie" },
  { en: "Double Garage", fr: "Double Garage", lb: "Doppel Garag" },
  { en: "Fireplace", fr: "Cheminée", lb: "Kamin" },
  {
    en: "Floor-to-ceiling Windows",
    fr: "Fenêtres sol-plafond",
    lb: "Buedefen-Fënsteren",
  },
  { en: "Guest House", fr: "Maison d'hôtes", lb: "Gasthaus" },
  { en: "Home Cinema", fr: "Cinéma privé", lb: "Heemkino" },
  { en: "Infinity Pool", fr: "Piscine à débordement", lb: "Infinity Pool" },
  { en: "Private Elevator", fr: "Ascenseur privé", lb: "Privat Lift" },
  { en: "Private Garden", fr: "Jardin privé", lb: "Privaten Gaart" },
  { en: "Roof Terrace", fr: "Terrasse sur le toit", lb: "Daachterras" },
  { en: "Smart Home", fr: "Maison connectée", lb: "Smart Home" },
  { en: "Wine Cellar", fr: "Cave à vin", lb: "Wäikeller" },
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
  <p className="mb-1.5 font-sans text-xs font-bold tracking-[0.22em] text-[#9ca3af] uppercase">
    {children}
  </p>
)

const FieldHint = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-1 font-sans text-xs text-[#9ca3af]">{children}</p>
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
  <div className="flex items-start gap-3">
    <div className="mt-2.5 flex flex-shrink-0 items-center gap-1.5">
      <span className="text-base leading-none">{flag}</span>
      <span className="w-5 font-sans text-xs font-bold tracking-widest text-[#9ca3af] uppercase">
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
        className="flex-1 resize-none border border-[#e5e7eb] bg-white px-4 py-2.5 font-sans text-sm transition-colors placeholder:text-[#c4c4c4] focus:border-[#163b0f] focus:outline-none"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="flex-1 border border-[#e5e7eb] bg-white px-4 py-2.5 font-sans text-sm transition-colors placeholder:text-[#c4c4c4] focus:border-[#163b0f] focus:outline-none"
      />
    )}
  </div>
)

// ─── Main component ───────────────────────────────────────────────────────────

export const AdminListings = () => {
  const { adminT } = useAdmin()
  const [properties, setProperties] = useState<Property[]>(
    PROPERTIES as Property[],
  )
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [knownAmenities, setKnownAmenities] =
    useState<AmenityOption[]>(SEED_AMENITIES)
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
    const {
      title_fr: _tf,
      title_lb: _tl,
      description_fr: _df,
      description_lb: _dl,
      ...base
    } = formData
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
    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, newOpt.en],
    }))
    setNewAmenity({ en: "", fr: "", lb: "" })
    setShowAddAmenity(false)
  }

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length))
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const stepInfo = STEPS[currentStep - 1]

  const noun =
    properties.length === 1
      ? adminT("admin_listings_noun_single")
      : adminT("admin_listings_noun_plural")

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 font-sans text-xs tracking-widest text-[#9ca3af] uppercase">
            {adminT("admin_management")}
          </p>
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-[#1a1a1a]">
            {adminT("admin_listings_title")}
          </h2>
          <p className="mt-1 font-sans text-sm text-[#6b7280]">
            {adminT("admin_listings_count", { count: properties.length, noun })}
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-sm bg-[#163b0f] px-5 py-2.5 font-sans text-xs font-bold tracking-widest text-[#fbf6f1] uppercase transition-colors hover:bg-[#163b0f]/90"
        >
          <Plus size={13} />
          {adminT("admin_add_new")}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#e8e4df] bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e8e4df] bg-[#f9f8f6]">
              {[
                adminT("admin_col_property"),
                "Location",
                adminT("admin_col_price"),
                adminT("admin_col_type"),
                adminT("admin_col_status"),
                "",
              ].map((h, i) => (
                <th
                  key={i}
                  className="px-5 py-3.5 text-left font-sans text-xs font-bold tracking-widest text-[#9ca3af] uppercase"
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
                className="border-b border-[#e8e4df] transition-colors last:border-none hover:bg-[#fafaf8]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-10 w-14 flex-shrink-0 rounded-md bg-[#f5f4f0] object-cover"
                    />
                    <span className="font-sans text-sm font-medium text-[#1a1a1a]">
                      {property.title}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="font-sans text-sm text-[#6b7280]">
                    {property.location}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="font-sans text-sm font-medium text-[#1a1a1a]">
                    €{property.price}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="font-sans text-xs tracking-wider text-[#6b7280] uppercase">
                    {property.type === "Sale"
                      ? adminT("admin_for_sale")
                      : adminT("admin_for_rent")}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-xs font-semibold ${
                      property.status === "Available"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        property.status === "Available"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
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
                      className="rounded-md p-2 text-[#9ca3af] transition-colors hover:bg-[#163b0f]/5 hover:text-[#163b0f]"
                    >
                      <Pencil size={13} />
                    </button>
                    {deleteConfirmId === property.id ? (
                      <div className="ml-1 flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="font-sans text-xs font-bold text-red-600 hover:underline"
                        >
                          {adminT("admin_confirm")}
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="font-sans text-xs text-[#6b7280] hover:underline"
                        >
                          {adminT("admin_cancel")}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(property.id)}
                        title="Delete property"
                        className="rounded-md p-2 text-[#9ca3af] transition-colors hover:bg-red-50 hover:text-red-500"
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
            <p className="font-sans text-sm text-[#9ca3af]">
              {adminT("admin_no_properties")}
            </p>
            <button
              onClick={openAdd}
              className="mt-4 font-sans text-xs font-bold tracking-widest text-[#163b0f] uppercase hover:underline"
            >
              {adminT("admin_add_first")} →
            </button>
          </div>
        )}
      </div>

      {/* Full-screen Property Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#fbf6f1]">
          {/* Top Bar */}
          <div className="flex flex-shrink-0 items-center justify-between border-b border-[#e8e4df] bg-white px-6 py-4 md:px-10">
            <div className="flex items-center gap-4">
              <img
                src="/inverted.png"
                alt="Hargarten Properties"
                className="h-8 w-auto object-contain"
              />
              <div className="h-6 w-px bg-[#e8e4df]" />
              <div>
                <p className="font-sans text-xs tracking-widest text-[#9ca3af] uppercase">
                  {editingId
                    ? adminT("admin_editing_listing")
                    : adminT("admin_creating_listing")}
                </p>
                <p className="font-sans text-sm leading-tight font-semibold text-[#1a1a1a]">
                  {editingId
                    ? formData.title || adminT("admin_col_property")
                    : adminT("admin_new_property")}
                </p>
              </div>
            </div>
            <button
              onClick={closeForm}
              className="flex items-center gap-2 border border-[#e8e4df] bg-white px-4 py-2 font-sans text-xs leading-none font-bold tracking-widest text-[#6b7280] uppercase transition-colors hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
            >
              <X size={13} className="shrink-0 -translate-y-px" />
              {adminT("admin_cancel")}
            </button>
          </div>

          {/* Step Progress Bar */}
          <div className="flex-shrink-0 border-b border-[#e8e4df] bg-white px-6 py-4 md:px-10">
            <div className="flex max-w-3xl items-start">
              {STEPS.map((step, idx) => (
                <div
                  key={step.number}
                  className="relative flex flex-1 flex-col items-center"
                >
                  {idx > 0 && (
                    <div
                      className={`absolute top-3 right-1/2 z-0 h-px w-full transition-colors ${
                        currentStep > idx ? "bg-[#163b0f]/30" : "bg-[#e8e4df]"
                      }`}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setCurrentStep(step.number)}
                    className="relative z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold transition-all"
                    style={{
                      background:
                        currentStep === step.number
                          ? "#163b0f"
                          : currentStep > step.number
                            ? "#dce1db"
                            : "#e8e4df",
                      color:
                        currentStep === step.number
                          ? "#fff"
                          : currentStep > step.number
                            ? "#163b0f"
                            : "#9ca3af",
                    }}
                  >
                    {currentStep > step.number ? (
                      <Check size={11} />
                    ) : (
                      step.number
                    )}
                  </button>
                  <span
                    className={`mt-1.5 hidden text-center font-sans text-xs leading-tight font-bold tracking-wider uppercase transition-colors md:block ${
                      currentStep === step.number
                        ? "text-[#163b0f]"
                        : "text-[#9ca3af]"
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
            <div className="mx-auto max-w-3xl px-6 py-10 md:px-0">
              {/* Step header */}
              <div className="mb-8">
                <p className="mb-2 font-sans text-xs font-bold tracking-[0.25em] text-[#9ca3af] uppercase">
                  {adminT("admin_step_of", {
                    current: stepInfo.number,
                    total: STEPS.length,
                  })}
                </p>
                <h2 className="mb-2 font-serif text-2xl tracking-tight text-[#1a1a1a] md:text-3xl">
                  {stepInfo.title}
                </h2>
                <p className="max-w-xl font-sans text-sm leading-relaxed text-[#6b7280]">
                  {stepInfo.subtitle}
                </p>
                <div className="mt-4 rounded-lg border border-[#163b0f]/10 bg-[#163b0f]/5 px-4 py-3">
                  <p className="font-sans text-xs leading-relaxed text-[#163b0f]">
                    <span className="font-bold tracking-wider uppercase">
                      {adminT("admin_tip")}:{" "}
                    </span>
                    {stepInfo.hint}
                  </p>
                </div>
              </div>

              {/* STEP 1: Hero Photo */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <SectionLabel>{adminT("admin_hero_image")}</SectionLabel>
                    <div className="group cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-[#e8e4df] bg-white transition-colors hover:border-[#163b0f]/40">
                      {formData.image ? (
                        <div className="relative">
                          <img
                            src={formData.image}
                            alt="Hero preview"
                            className="h-64 w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className="flex items-center gap-2 font-sans text-sm font-medium text-white">
                              <Upload size={16} />
                              {adminT("admin_click_replace")}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-4 px-8 py-16 text-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f4f0]">
                            <Upload size={22} className="text-[#9ca3af]" />
                          </div>
                          <div>
                            <p className="font-sans text-base font-semibold text-[#1a1a1a]">
                              {adminT("admin_upload_hero")}
                            </p>
                            <p className="mt-1 font-sans text-sm text-[#9ca3af]">
                              {adminT("admin_jpg_png")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <FieldHint>{adminT("admin_hero_hint")}</FieldHint>
                  </div>

                  <div>
                    <SectionLabel>
                      {adminT("admin_gallery_images")}
                    </SectionLabel>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="group flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#e8e4df] bg-white transition-all hover:border-[#163b0f]/30 hover:bg-[#f9f8f6]"
                        >
                          <ImagePlus
                            size={20}
                            className="text-[#c4c4c4] transition-colors group-hover:text-[#163b0f]/40"
                          />
                          <span className="font-sans text-xs tracking-wider text-[#c4c4c4] uppercase group-hover:text-[#9ca3af]">
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
                    <SectionLabel>
                      Property Name — in all three languages (required)
                    </SectionLabel>
                    <p className="mb-3 font-sans text-xs text-[#6b7280]">
                      {adminT("admin_prop_name_hint")}
                    </p>
                    <div className="space-y-2.5 rounded-lg border border-[#e5e7eb] bg-white p-4">
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
                      className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 font-sans text-sm transition-colors placeholder:text-[#c4c4c4] focus:border-[#163b0f] focus:outline-none"
                    />
                    <FieldHint>
                      Enter the neighbourhood and city, e.g. "Limpertsberg,
                      Luxembourg City".
                    </FieldHint>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Price */}
                    <div>
                      <SectionLabel>
                        {adminT("admin_asking_price")}
                      </SectionLabel>
                      <div className="relative">
                        <span className="absolute top-1/2 left-4 -translate-y-1/2 font-sans text-sm text-[#6b7280]">
                          €
                        </span>
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) => field("price", e.target.value)}
                          placeholder="e.g. 2.5M or 3500/mo"
                          required
                          className="w-full rounded-lg border border-[#e5e7eb] bg-white py-3 pr-4 pl-8 font-sans text-sm transition-colors placeholder:text-[#c4c4c4] focus:border-[#163b0f] focus:outline-none"
                        />
                      </div>
                      <FieldHint>{adminT("admin_price_hint")}</FieldHint>
                    </div>

                    {/* Status */}
                    <div>
                      <SectionLabel>
                        {adminT("admin_availability")}
                      </SectionLabel>
                      <button
                        type="button"
                        onClick={() =>
                          field(
                            "status",
                            formData.status === "Available"
                              ? "Reserved"
                              : "Available",
                          )
                        }
                        className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 font-sans text-sm font-medium transition-all ${
                          formData.status === "Available"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-amber-200 bg-amber-50 text-amber-700"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              formData.status === "Available"
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                          />
                          {formData.status === "Available"
                            ? adminT("admin_status_available")
                            : adminT("admin_status_reserved")}
                        </span>
                        <span className="text-xs tracking-wider uppercase opacity-60">
                          {adminT("admin_click_toggle")}
                        </span>
                      </button>
                      <FieldHint>
                        {adminT("admin_available_reserved_hint")}
                      </FieldHint>
                    </div>
                  </div>

                  {/* Transaction Type */}
                  <div>
                    <SectionLabel>
                      {adminT("admin_transaction_type")}
                    </SectionLabel>
                    <div className="flex overflow-hidden rounded-lg border border-[#e5e7eb]">
                      {(["Sale", "Rent"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => field("type", t)}
                          className={`flex-1 py-3 font-sans text-xs font-bold tracking-widest uppercase transition-all ${
                            formData.type === t
                              ? "bg-[#163b0f] text-[#fbf6f1]"
                              : "bg-white text-[#6b7280] hover:bg-[#f9f8f6]"
                          }`}
                        >
                          {t === "Sale"
                            ? adminT("admin_for_sale")
                            : adminT("admin_for_rent")}
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
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {[
                      {
                        labelKey: "admin_bedrooms",
                        key: "bedrooms" as const,
                        type: "number",
                        hintKey: "admin_bedrooms_hint",
                        placeholder: "e.g. 3",
                      },
                      {
                        labelKey: "admin_bathrooms",
                        key: "bathrooms" as const,
                        type: "number",
                        hintKey: "admin_bathrooms_hint",
                        placeholder: "e.g. 2",
                      },
                      {
                        labelKey: "admin_surface",
                        key: "sqm" as const,
                        type: "text",
                        hintKey: "admin_surface_hint",
                        placeholder: "e.g. 142.5",
                      },
                    ].map(({ labelKey, key, type, hintKey, placeholder }) => (
                      <div key={key}>
                        <SectionLabel>{adminT(labelKey)}</SectionLabel>
                        <input
                          type={type}
                          value={formData[key]}
                          onChange={(e) =>
                            field(
                              key,
                              type === "number"
                                ? Number(e.target.value)
                                : e.target.value,
                            )
                          }
                          min={type === "number" ? 0 : undefined}
                          placeholder={placeholder}
                          className="w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 font-sans text-sm transition-colors placeholder:text-[#c4c4c4] focus:border-[#163b0f] focus:outline-none"
                        />
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
                    <p className="mb-3 font-sans text-xs text-[#6b7280]">
                      {adminT("admin_desc_hint_text")}
                    </p>
                    <div className="space-y-2.5 rounded-lg border border-[#e5e7eb] bg-white p-4">
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
                      {adminT("admin_amenities_selected", {
                        count: formData.amenities.length,
                      })}
                    </SectionLabel>
                    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
                      {knownAmenities.map((amenity) => {
                        const selected = formData.amenities.includes(amenity.en)
                        return (
                          <button
                            key={amenity.en}
                            type="button"
                            onClick={() => toggleAmenity(amenity.en)}
                            className={`flex items-center justify-between gap-2 rounded-lg border px-4 py-3 text-left transition-all ${
                              selected
                                ? "border-[#163b0f] bg-[#163b0f]/5 text-[#163b0f]"
                                : "border-[#e5e7eb] bg-white text-[#6b7280] hover:border-[#163b0f]/30 hover:bg-[#f9f8f6]"
                            }`}
                          >
                            <div className="min-w-0">
                              <p className="truncate font-sans text-xs leading-tight font-semibold">
                                {amenity.en}
                              </p>
                              <p className="mt-0.5 truncate font-sans text-xs text-current opacity-60">
                                {amenity.fr} · {amenity.lb}
                              </p>
                            </div>
                            <span
                              className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-all ${
                                selected
                                  ? "border-[#163b0f] bg-[#163b0f]"
                                  : "border-[#d1d5db] bg-white"
                              }`}
                            >
                              {selected && (
                                <Check size={9} className="text-white" />
                              )}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Add new amenity */}
                  <div className="overflow-hidden rounded-xl border border-[#e8e4df] bg-white">
                    <button
                      type="button"
                      onClick={() => setShowAddAmenity((v) => !v)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#f9f8f6]"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#163b0f]/8">
                          <Plus size={11} className="text-[#163b0f]" />
                        </div>
                        <div>
                          <p className="font-sans text-sm font-semibold text-[#1a1a1a]">
                            {adminT("admin_add_amenity_heading")}
                          </p>
                          <p className="font-sans text-xs text-[#9ca3af]">
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
                      <div className="border-t border-[#e8e4df] bg-[#fafaf8] px-5 py-5">
                        <p className="mb-4 font-sans text-xs text-[#6b7280]">
                          {adminT("admin_add_amenity_desc")}
                        </p>
                        <div className="mb-4 space-y-2.5 rounded-lg border border-[#e5e7eb] bg-white p-4">
                          {[
                            {
                              lang: "EN",
                              flag: "🇬🇧",
                              key: "en" as const,
                              placeholder: "e.g. Heated Floors",
                            },
                            {
                              lang: "LB",
                              flag: "🇱🇺",
                              key: "lb" as const,
                              placeholder: "e.g. Geheizte Buedem",
                            },
                            {
                              lang: "FR",
                              flag: "🇫🇷",
                              key: "fr" as const,
                              placeholder: "e.g. Plancher chauffant",
                            },
                          ].map(({ lang, flag, key, placeholder }) => (
                            <div key={key}>
                              <LangInput
                                lang={lang}
                                flag={flag}
                                value={newAmenity[key]}
                                onChange={(v) =>
                                  setNewAmenity((prev) => ({
                                    ...prev,
                                    [key]: v,
                                  }))
                                }
                                placeholder={placeholder}
                              />
                              {key !== "fr" && (
                                <div className="mt-2.5 h-px bg-[#f0ede9]" />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={addNewAmenity}
                            disabled={
                              !newAmenity.en.trim() ||
                              !newAmenity.fr.trim() ||
                              !newAmenity.lb.trim()
                            }
                            className="flex items-center gap-2 rounded-sm bg-[#163b0f] px-5 py-2.5 font-sans text-xs font-bold tracking-widest text-[#fbf6f1] uppercase transition-colors hover:bg-[#163b0f]/90 disabled:cursor-not-allowed disabled:opacity-40"
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
                            className="rounded-sm border border-[#e5e7eb] px-5 py-2.5 font-sans text-xs font-bold tracking-widest text-[#6b7280] uppercase transition-colors hover:bg-[#f5f4f0]"
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
          <div className="flex flex-shrink-0 items-center justify-between border-t border-[#e8e4df] bg-white px-6 py-4 md:px-10">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentStep === 1}
              className="flex items-center gap-2 rounded-sm border border-[#e5e7eb] px-5 py-2.5 font-sans text-xs font-bold tracking-widest text-[#6b7280] uppercase transition-colors hover:bg-[#f5f4f0] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={13} />
              {adminT("admin_previous")}
            </button>

            <p className="hidden font-sans text-xs tracking-wider text-[#9ca3af] uppercase md:block">
              {adminT("admin_step_of", {
                current: currentStep,
                total: STEPS.length,
              })}
            </p>

            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={goNext}
                className="flex items-center gap-2 rounded-sm bg-[#163b0f] px-6 py-2.5 font-sans text-xs font-bold tracking-widest text-[#fbf6f1] uppercase transition-colors hover:bg-[#163b0f]/90"
              >
                {adminT("admin_next_step")}
                <ChevronRight size={13} />
              </button>
            ) : (
              <button
                type="submit"
                form="property-form"
                className="flex items-center gap-2 rounded-sm bg-[#163b0f] px-6 py-2.5 font-sans text-xs font-bold tracking-widest text-[#fbf6f1] uppercase transition-colors hover:bg-[#163b0f]/90"
              >
                <Check size={13} />
                {editingId
                  ? adminT("admin_save_changes")
                  : adminT("admin_create_listing")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
