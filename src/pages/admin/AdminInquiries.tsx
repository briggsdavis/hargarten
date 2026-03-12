import { useState } from "react"
import {
  Search,
  ChevronDown,
  ChevronRight,
  Trash2,
  CheckCircle,
  SlidersHorizontal,
  Mail,
} from "lucide-react"

type Subject = "Property Inquiry" | "Legal Consultation" | "Management Request" | string

type Inquiry = {
  id: string
  date: string
  firstName: string
  lastName: string
  email: string
  subject: Subject
  message: string
  read: boolean
}

const SAMPLE_INQUIRIES: Inquiry[] = [
  {
    id: "1",
    date: "2026-03-05",
    firstName: "Sophie",
    lastName: "Müller",
    email: "sophie.muller@example.lu",
    subject: "Property Inquiry",
    message:
      "I am very interested in The Penthouse Suite listing. Could we arrange a private viewing at your earliest convenience? I am available most weekday afternoons and would greatly appreciate a discreet, personalised showing.",
    read: false,
  },
  {
    id: "2",
    date: "2026-03-04",
    firstName: "Jean-Pierre",
    lastName: "Fontaine",
    email: "jp.fontaine@enterprise.lu",
    subject: "Legal Consultation",
    message:
      "We are a family trust looking to acquire a portfolio of properties in Luxembourg City. We require comprehensive legal advisory services covering cross-border regulations, notarial coordination, and full due diligence. Please contact me to arrange an initial consultation at your earliest convenience.",
    read: true,
  },
  {
    id: "3",
    date: "2026-03-03",
    firstName: "Elena",
    lastName: "Rossi",
    email: "elena.rossi@gmail.com",
    subject: "Management Request",
    message:
      "I currently own two apartments in Kirchberg and am seeking a professional property management firm to handle tenant relations, maintenance coordination, and monthly rental income reporting on my behalf. Please send me your service overview and fee structure.",
    read: false,
  },
  {
    id: "4",
    date: "2026-03-02",
    firstName: "Thomas",
    lastName: "Weber",
    email: "t.weber@weberfamily.de",
    subject: "Relocation enquiry — Frankfurt to Luxembourg",
    message:
      "My family and I are relocating from Frankfurt to Luxembourg and would like to understand the luxury rental market in Limpertsberg and Belair. Budget is very flexible. We have two children and strongly prefer family homes with private gardens. Please contact me at your earliest convenience to discuss our requirements in detail.",
    read: true,
  },
  {
    id: "5",
    date: "2026-02-28",
    firstName: "Amina",
    lastName: "Hassan",
    email: "amina.hassan@outlook.com",
    subject: "Property Inquiry",
    message:
      "Hello, I came across the Forest Edge Villa listing and I am extremely interested. Could you provide additional details on the property including full renovation history, any applicable HOA fees, and whether the guest house is included within the listing price? I would also appreciate information on the surrounding land boundary.",
    read: false,
  },
]

const SUBJECT_COLORS: Record<string, string> = {
  "Property Inquiry": "bg-blue-50 text-blue-700 border-blue-100",
  "Legal Consultation": "bg-violet-50 text-violet-700 border-violet-100",
  "Management Request": "bg-amber-50 text-amber-700 border-amber-100",
}

const getSubjectStyle = (subject: string) =>
  SUBJECT_COLORS[subject] || "bg-[#f5f4f0] text-[#6b7280] border-[#e8e4df]"

const SUBJECT_OPTIONS = [
  "All Subjects",
  "Property Inquiry",
  "Legal Consultation",
  "Management Request",
  "Other",
]

const DATE_OPTIONS = ["Newest First", "Oldest First"]

export const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>(SAMPLE_INQUIRIES)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("All Subjects")
  const [dateSort, setDateSort] = useState("Newest First")
  const [showSubjectDrop, setShowSubjectDrop] = useState(false)
  const [showDateDrop, setShowDateDrop] = useState(false)

  const toggleExpand = (id: string) => setExpandedId((prev) => (prev === id ? null : id))

  const markAsRead = (id: string) =>
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, read: true } : i)))

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  const closeDrop = () => {
    setShowSubjectDrop(false)
    setShowDateDrop(false)
  }

  const filtered = inquiries
    .filter((i) => {
      const term = search.toLowerCase()
      const matchSearch =
        !term || `${i.firstName} ${i.lastName} ${i.email}`.toLowerCase().includes(term)

      const KNOWN = ["Property Inquiry", "Legal Consultation", "Management Request"]
      const matchSubject =
        subjectFilter === "All Subjects" ||
        (subjectFilter === "Other" ? !KNOWN.includes(i.subject) : i.subject === subjectFilter)

      return matchSearch && matchSubject
    })
    .sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime()
      return dateSort === "Newest First" ? diff : -diff
    })

  const unreadCount = inquiries.filter((i) => !i.read).length

  return (
    // Close dropdowns when clicking outside
    <div className="p-8" onClick={closeDrop}>
      {/* ─── Header ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#9ca3af] font-sans mb-1">
            CRM Inbox
          </p>
          <h2 className="text-2xl font-sans font-semibold text-[#1a1a1a] tracking-tight">
            Inquiries
          </h2>
          <p className="text-sm font-sans text-[#6b7280] mt-1">
            {inquiries.length} total ·{" "}
            <span className={unreadCount > 0 ? "text-[#163b0f] font-semibold" : ""}>
              {unreadCount} unread
            </span>
          </p>
        </div>
      </div>

      {/* ─── Search & Filter Bar ──────────────────────────────── */}
      <div className="flex gap-3 mb-6 flex-wrap" onClick={(e) => e.stopPropagation()}>
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full pl-9 pr-4 py-2.5 border border-[#e5e7eb] text-sm font-sans focus:outline-none focus:border-[#163b0f] transition-colors bg-white placeholder:text-[#c4c4c4]"
          />
        </div>

        {/* Subject Filter */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowSubjectDrop((p) => !p)
              setShowDateDrop(false)
            }}
            className="flex items-center gap-2 px-4 py-2.5 border border-[#e5e7eb] bg-white text-sm font-sans text-[#6b7280] hover:border-[#163b0f]/30 transition-colors"
          >
            <SlidersHorizontal size={12} />
            <span>{subjectFilter}</span>
            <ChevronDown
              size={12}
              className={`transition-transform ${showSubjectDrop ? "rotate-180" : ""}`}
            />
          </button>
          {showSubjectDrop && (
            <div className="absolute top-full mt-1 left-0 bg-white border border-[#e8e4df] shadow-lg z-20 min-w-[190px] py-1">
              {SUBJECT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSubjectFilter(opt)
                    setShowSubjectDrop(false)
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm font-sans hover:bg-[#f5f4f0] transition-colors ${
                    subjectFilter === opt ? "text-[#163b0f] font-semibold" : "text-[#6b7280]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Sort */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowDateDrop((p) => !p)
              setShowSubjectDrop(false)
            }}
            className="flex items-center gap-2 px-4 py-2.5 border border-[#e5e7eb] bg-white text-sm font-sans text-[#6b7280] hover:border-[#163b0f]/30 transition-colors"
          >
            <span>{dateSort}</span>
            <ChevronDown
              size={12}
              className={`transition-transform ${showDateDrop ? "rotate-180" : ""}`}
            />
          </button>
          {showDateDrop && (
            <div className="absolute top-full mt-1 left-0 bg-white border border-[#e8e4df] shadow-lg z-20 min-w-[150px] py-1">
              {DATE_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={(e) => {
                    e.stopPropagation()
                    setDateSort(opt)
                    setShowDateDrop(false)
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm font-sans hover:bg-[#f5f4f0] transition-colors ${
                    dateSort === opt ? "text-[#163b0f] font-semibold" : "text-[#6b7280]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Inquiries Table ──────────────────────────────────── */}
      <div className="bg-white border border-[#e8e4df] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e8e4df] bg-[#f9f8f6]">
              <th className="w-8 px-4 py-3.5" />
              {["Date Received", "First Name", "Last Name", "Email", "Subject"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3.5 text-[9px] uppercase tracking-widest text-[#9ca3af] font-sans font-bold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center text-sm font-sans text-[#9ca3af]">
                  No inquiries match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((inquiry) => (
                <>
                  {/* ── Main Row ───────────────────────────────── */}
                  <tr
                    key={inquiry.id}
                    onClick={() => toggleExpand(inquiry.id)}
                    className={`border-b border-[#e8e4df] transition-colors ${
                      expandedId === inquiry.id ? "bg-[#f9f8f6]" : "hover:bg-[#fafaf8]"
                    } ${!inquiry.read ? "" : ""}`}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Expand chevron */}
                    <td className="px-4 py-4 w-8">
                      {expandedId === inquiry.id ? (
                        <ChevronDown size={13} className="text-[#163b0f]" />
                      ) : (
                        <ChevronRight size={13} className="text-[#c4c4c4]" />
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-sans text-[#6b7280]">
                        {new Date(inquiry.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    {/* First Name */}
                    <td className="px-4 py-4">
                      <span
                        className={`text-sm font-sans ${
                          !inquiry.read ? "text-[#1a1a1a] font-semibold" : "text-[#6b7280]"
                        }`}
                      >
                        {inquiry.firstName}
                      </span>
                    </td>

                    {/* Last Name */}
                    <td className="px-4 py-4">
                      <span
                        className={`text-sm font-sans ${
                          !inquiry.read ? "text-[#1a1a1a] font-semibold" : "text-[#6b7280]"
                        }`}
                      >
                        {inquiry.lastName}
                      </span>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4">
                      <span className="text-sm font-sans text-[#6b7280]">{inquiry.email}</span>
                    </td>

                    {/* Subject */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {!inquiry.read && (
                          <span
                            className="w-2 h-2 rounded-full bg-[#163b0f] flex-shrink-0"
                            title="Unread"
                          />
                        )}
                        <span
                          className={`text-[10px] font-sans font-semibold px-2.5 py-1 rounded-full border ${getSubjectStyle(
                            inquiry.subject,
                          )}`}
                        >
                          {inquiry.subject.length > 28
                            ? inquiry.subject.slice(0, 26) + "…"
                            : inquiry.subject}
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* ── Expanded Message Row ────────────────────── */}
                  {expandedId === inquiry.id && (
                    <tr
                      key={`${inquiry.id}-exp`}
                      className="bg-[#f9f8f6] border-b border-[#e8e4df]"
                    >
                      <td colSpan={6} className="px-10 py-6">
                        {/* Full subject line (in case it was truncated) */}
                        {inquiry.subject.length > 28 && (
                          <p className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#9ca3af] mb-2">
                            {inquiry.subject}
                          </p>
                        )}

                        {/* Message body */}
                        <div className="bg-white border border-[#e8e4df] rounded-lg px-5 py-4 mb-5">
                          <p className="text-[9px] uppercase tracking-widest font-sans font-bold text-[#9ca3af] mb-2.5">
                            Message
                          </p>
                          <p className="text-sm font-sans text-[#1a1a1a] leading-relaxed">
                            {inquiry.message}
                          </p>
                        </div>

                        {/* Actions row */}
                        <div className="flex items-center gap-2.5 flex-wrap">
                          {!inquiry.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(inquiry.id)
                              }}
                              className="flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-widest font-sans font-bold text-[#163b0f] border border-[#163b0f]/25 hover:bg-[#163b0f] hover:text-[#fbf6f1] hover:border-[#163b0f] transition-all rounded-sm"
                            >
                              <CheckCircle size={12} />
                              Mark as Read
                            </button>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteInquiry(inquiry.id)
                            }}
                            className="flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-widest font-sans font-bold text-red-500 border border-red-200 hover:bg-red-50 transition-all rounded-sm"
                          >
                            <Trash2 size={12} />
                            Delete
                          </button>

                          <a
                            href={`mailto:${inquiry.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-widest font-sans font-bold text-[#6b7280] border border-[#e5e7eb] hover:bg-white hover:border-[#163b0f]/30 transition-all rounded-sm ml-auto"
                          >
                            <Mail size={12} />
                            Reply via Email
                          </a>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
