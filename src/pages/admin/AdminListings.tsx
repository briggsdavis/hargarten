import { useState } from "react"
import { Plus, Pencil, Trash2, X, Upload, ImagePlus } from "lucide-react"
import { PROPERTIES } from "../../constants"

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

type FormData = Omit<Property, "id">

const EMPTY_FORM: FormData = {
  title: "",
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
}

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-5">
    <h4 className="text-[9px] uppercase tracking-[0.2em] font-sans font-bold text-[#9ca3af] whitespace-nowrap">
      {children}
    </h4>
    <div className="flex-1 h-px bg-[#e8e4df]" />
  </div>
)

export const AdminListings = () => {
  const [properties, setProperties] = useState<Property[]>(PROPERTIES as Property[])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [amenityInput, setAmenityInput] = useState("")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const openAdd = () => {
    setFormData(EMPTY_FORM)
    setEditingId(null)
    setIsFormOpen(true)
  }

  const openEdit = (property: Property) => {
    const { id, ...rest } = property
    setFormData(rest as FormData)
    setEditingId(id)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingId(null)
    setFormData(EMPTY_FORM)
    setAmenityInput("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setProperties((prev) =>
        prev.map((p) => (p.id === editingId ? { ...formData, id: editingId } : p))
      )
    } else {
      setProperties((prev) => [...prev, { ...formData, id: String(Date.now()) }])
    }
    closeForm()
  }

  const handleDelete = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id))
    setDeleteConfirmId(null)
  }

  const addAmenity = () => {
    const val = amenityInput.trim()
    if (val && !formData.amenities.includes(val)) {
      setFormData((prev) => ({ ...prev, amenities: [...prev.amenities, val] }))
      setAmenityInput("")
    }
  }

  const removeAmenity = (tag: string) => {
    setFormData((prev) => ({ ...prev, amenities: prev.amenities.filter((a) => a !== tag) }))
  }

  const field = (key: keyof FormData, value: string | number) =>
    setFormData((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="p-8">

      {/* ─── Header ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#9ca3af] font-sans mb-1">
            Management
          </p>
          <h2 className="text-2xl font-sans font-semibold text-[#1a1a1a] tracking-tight">
            Property Listings
          </h2>
          <p className="text-sm font-sans text-[#6b7280] mt-1">
            {properties.length} {properties.length === 1 ? "property" : "properties"} in portfolio
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#163b0f] text-[#fbf6f1] px-5 py-2.5 text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#163b0f]/90 transition-colors rounded-sm"
        >
          <Plus size={13} />
          Add New Property
        </button>
      </div>

      {/* ─── Table ────────────────────────────────────────────── */}
      <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e8e4df] bg-[#f9f8f6]">
              {["Property", "Location", "Price", "Type", "Status", ""].map((h) => (
                <th
                  key={h}
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
                {/* Thumbnail + Name */}
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
                    {property.type}
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
                    {property.status}
                  </span>
                </td>

                {/* Actions */}
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
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="text-[10px] font-sans text-[#6b7280] hover:underline"
                        >
                          Cancel
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
            <p className="text-sm font-sans text-[#9ca3af]">No properties in portfolio yet.</p>
            <button
              onClick={openAdd}
              className="mt-4 text-[10px] uppercase tracking-widest font-sans font-bold text-[#163b0f] hover:underline"
            >
              Add your first property →
            </button>
          </div>
        )}
      </div>

      {/* ─── Slide-in Form Panel ──────────────────────────────── */}
      {isFormOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/25 z-20 backdrop-blur-[1px]"
            onClick={closeForm}
          />

          {/* Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-[680px] bg-white shadow-2xl z-30 flex flex-col">

            {/* Sticky Panel Header */}
            <div className="flex-shrink-0 bg-white border-b border-[#e8e4df] px-8 py-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-sans font-semibold text-[#1a1a1a]">
                  {editingId ? "Edit Property" : "Add New Property"}
                </h3>
                <p className="text-xs font-sans text-[#6b7280] mt-0.5">
                  {editingId
                    ? "Update the listing details below."
                    : "Fill in the details to create a new listing."}
                </p>
              </div>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-[#f5f4f0] rounded-md transition-colors text-[#6b7280] hover:text-[#1a1a1a]"
              >
                <X size={17} />
              </button>
            </div>

            {/* Scrollable Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-7 flex flex-col gap-9">

              {/* ── Media ──────────────────────────────────────── */}
              <section>
                <SectionHeader>Media</SectionHeader>

                {/* Hero image URL input */}
                <div className="mb-4">
                  <label className="block text-[10px] uppercase tracking-widest text-[#6b7280] font-sans font-medium mb-1.5">
                    Hero Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => field("image", e.target.value)}
                    placeholder="https://images.pexels.com/..."
                    className="w-full px-4 py-2.5 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors text-[#1a1a1a] placeholder:text-[#c4c4c4]"
                  />
                </div>

                {/* Hero Drop Zone */}
                <div className="border-2 border-dashed border-[#e8e4df] rounded-lg mb-5 overflow-hidden hover:border-[#163b0f]/40 transition-colors group">
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Hero preview"
                        className="w-full h-44 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-2 text-white text-xs font-sans font-medium">
                          <Upload size={14} />
                          Replace Image
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 flex flex-col items-center gap-3 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#f5f4f0] flex items-center justify-center">
                        <Upload size={18} className="text-[#9ca3af]" />
                      </div>
                      <div>
                        <p className="text-sm font-sans font-medium text-[#1a1a1a]">
                          Upload Hero Image
                        </p>
                        <p className="text-xs font-sans text-[#9ca3af] mt-0.5">
                          Drag & drop or click to browse · PNG, JPG up to 10 MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Gallery Grid */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#6b7280] font-sans font-medium mb-2">
                    Gallery Images
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square border-2 border-dashed border-[#e8e4df] rounded-lg flex flex-col items-center justify-center gap-1 hover:border-[#163b0f]/30 hover:bg-[#f9f8f6] transition-all group"
                      >
                        <ImagePlus size={16} className="text-[#c4c4c4] group-hover:text-[#163b0f]/40 transition-colors" />
                        <span className="text-[8px] uppercase tracking-wider font-sans text-[#c4c4c4] group-hover:text-[#9ca3af]">
                          Add
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[9px] font-sans text-[#9ca3af] mt-1.5">
                    Drag to reorder · Multiple images supported
                  </p>
                </div>
              </section>

              {/* ── Core Details ───────────────────────────────── */}
              <section>
                <SectionHeader>Core Details</SectionHeader>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#6b7280] font-sans font-medium mb-1.5">
                      Property Name
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => field("title", e.target.value)}
                      placeholder="e.g. The Penthouse Suite"
                      required
                      className="w-full px-4 py-2.5 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors placeholder:text-[#c4c4c4]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#6b7280] font-sans font-medium mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => field("location", e.target.value)}
                      placeholder="e.g. Kirchberg, Luxembourg"
                      required
                      className="w-full px-4 py-2.5 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors placeholder:text-[#c4c4c4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Price */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#6b7280] font-sans font-medium mb-1.5">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6b7280] font-sans">
                        €
                      </span>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => field("price", e.target.value)}
                        placeholder="e.g. 2.5M"
                        required
                        className="w-full pl-8 pr-4 py-2.5 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors placeholder:text-[#c4c4c4]"
                      />
                    </div>
                  </div>

                  {/* Status toggle button */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#6b7280] font-sans font-medium mb-1.5">
                      Status
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        field("status", formData.status === "Available" ? "Reserved" : "Available")
                      }
                      className={`w-full flex items-center justify-between px-4 py-2.5 border text-sm font-sans font-medium transition-all ${
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
                        {formData.status}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider opacity-60">
                        Click to toggle
                      </span>
                    </button>
                  </div>
                </div>

                {/* Transaction Type */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#6b7280] font-sans font-medium mb-1.5">
                    Transaction Type
                  </label>
                  <div className="flex border border-[#e5e7eb] overflow-hidden">
                    {(["Sale", "Rent"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => field("type", t)}
                        className={`flex-1 py-2.5 text-[10px] uppercase tracking-widest font-sans font-bold transition-all ${
                          formData.type === t
                            ? "bg-[#163b0f] text-[#fbf6f1]"
                            : "bg-white text-[#6b7280] hover:bg-[#f9f8f6]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── Specifications ─────────────────────────────── */}
              <section>
                <SectionHeader>Specifications</SectionHeader>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Bedrooms", key: "bedrooms" as const, suffix: "rooms", type: "number" },
                    { label: "Bathrooms", key: "bathrooms" as const, suffix: "baths", type: "number" },
                    { label: "Square Metres", key: "sqm" as const, suffix: "m²", type: "text" },
                  ].map(({ label, key, suffix, type }) => (
                    <div key={key}>
                      <label className="block text-[10px] uppercase tracking-widest text-[#6b7280] font-sans font-medium mb-1.5">
                        {label}
                      </label>
                      <div className="relative">
                        <input
                          type={type}
                          value={formData[key]}
                          onChange={(e) =>
                            field(key, type === "number" ? Number(e.target.value) : e.target.value)
                          }
                          min={type === "number" ? 0 : undefined}
                          placeholder="0"
                          className="w-full px-4 pr-10 py-2.5 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors placeholder:text-[#c4c4c4]"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-[#9ca3af] font-sans uppercase tracking-wider">
                          {suffix}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Content ────────────────────────────────────── */}
              <section>
                <SectionHeader>Content</SectionHeader>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#6b7280] font-sans font-medium mb-1.5">
                    Introductory Text
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => field("description", e.target.value)}
                    rows={4}
                    placeholder="A brief, compelling description of the property…"
                    className="w-full px-4 py-3 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors resize-none placeholder:text-[#c4c4c4]"
                  />
                </div>
              </section>

              {/* ── Amenities ──────────────────────────────────── */}
              <section>
                <SectionHeader>Amenities</SectionHeader>

                {/* Tag input */}
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addAmenity()
                      }
                    }}
                    placeholder='Type an amenity and press Enter — e.g. "High-speed Wi-Fi"'
                    className="flex-1 px-4 py-2.5 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors placeholder:text-[#c4c4c4]"
                  />
                  <button
                    type="button"
                    onClick={addAmenity}
                    className="px-4 py-2.5 bg-[#163b0f] text-[#fbf6f1] text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#163b0f]/90 transition-colors"
                  >
                    Add
                  </button>
                </div>

                {/* Amenity pills */}
                {formData.amenities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1.5 bg-[#163b0f]/6 text-[#163b0f] text-[11px] font-sans font-medium px-3 py-1.5 rounded-full border border-[#163b0f]/10"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeAmenity(tag)}
                          className="hover:text-red-500 transition-colors ml-0.5"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-sans text-[#9ca3af] italic">
                    No amenities added. Type above and press Enter to add.
                  </p>
                )}
              </section>

              {/* ── Submit ─────────────────────────────────────── */}
              <div className="flex gap-3 pt-4 border-t border-[#e8e4df] sticky bottom-0 bg-white -mx-8 px-8 py-5 -mb-7">
                <button
                  type="submit"
                  className="flex-1 bg-[#163b0f] text-[#fbf6f1] py-3 text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#163b0f]/90 transition-colors"
                >
                  {editingId ? "Save Changes" : "Create Listing"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-6 py-3 border border-[#e5e7eb] text-[#6b7280] text-[10px] uppercase tracking-widest font-sans font-bold hover:bg-[#f5f4f0] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
