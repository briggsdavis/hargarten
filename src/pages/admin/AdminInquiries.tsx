import {
  Search,
  ChevronDown,
  ChevronRight,
  Trash2,
  CheckCircle,
  SlidersHorizontal,
  Mail,
} from "lucide-react"
import { useState } from "react"
import { useAdmin } from "../../context/AdminContext"

type Subject =
  | "Property Inquiry"
  | "Legal Consultation"
  | "Management Request"
  | string

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
    subject: "Relocation enquiry - Frankfurt to Luxembourg",
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

// Internal filter values stay as English keys; display is translated
const SUBJECT_FILTER_KEYS = [
  { value: "All Subjects", translationKey: "admin_all_subjects" },
  { value: "Property Inquiry", translationKey: "admin_subject_inquiry" },
  { value: "Legal Consultation", translationKey: "admin_subject_legal" },
  { value: "Management Request", translationKey: "admin_subject_management" },
  { value: "Other", translationKey: "admin_subject_other" },
]

const DATE_SORT_KEYS = [
  { value: "Newest First", translationKey: "admin_newest_first" },
  { value: "Oldest First", translationKey: "admin_oldest_first" },
]

// Map English subject values to translation keys for badge display
const SUBJECT_TRANSLATION_KEY: Record<string, string> = {
  "Property Inquiry": "admin_subject_inquiry",
  "Legal Consultation": "admin_subject_legal",
  "Management Request": "admin_subject_management",
}

export const AdminInquiries = () => {
  const { adminT } = useAdmin()
  const [inquiries, setInquiries] = useState<Inquiry[]>(SAMPLE_INQUIRIES)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("All Subjects")
  const [dateSort, setDateSort] = useState("Newest First")
  const [showSubjectDrop, setShowSubjectDrop] = useState(false)
  const [showDateDrop, setShowDateDrop] = useState(false)

  const toggleExpand = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id))

  const markAsRead = (id: string) =>
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, read: true } : i)),
    )

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
        !term ||
        `${i.firstName} ${i.lastName} ${i.email}`.toLowerCase().includes(term)

      const KNOWN = [
        "Property Inquiry",
        "Legal Consultation",
        "Management Request",
      ]
      const matchSubject =
        subjectFilter === "All Subjects" ||
        (subjectFilter === "Other"
          ? !KNOWN.includes(i.subject)
          : i.subject === subjectFilter)

      return matchSearch && matchSubject
    })
    .sort((a, b) => {
      const diff = new Date(b.date).getTime() - new Date(a.date).getTime()
      return dateSort === "Newest First" ? diff : -diff
    })

  const unreadCount = inquiries.filter((i) => !i.read).length

  const translateSubject = (subject: string): string => {
    const key = SUBJECT_TRANSLATION_KEY[subject]
    return key ? adminT(key) : subject
  }

  const currentSubjectLabel = SUBJECT_FILTER_KEYS.find(
    (k) => k.value === subjectFilter,
  )
  const currentDateLabel = DATE_SORT_KEYS.find((k) => k.value === dateSort)

  return (
    <div className="p-8" onClick={closeDrop}>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-1 font-sans text-[10px] tracking-widest text-[#9ca3af] uppercase">
            {adminT("admin_crm_inbox")}
          </p>
          <h2 className="font-sans text-2xl font-semibold tracking-tight text-[#1a1a1a]">
            {adminT("admin_inquiries_title")}
          </h2>
          <p className="mt-1 font-sans text-sm text-[#6b7280]">
            {adminT("admin_inquiries_count", {
              total: inquiries.length,
              unread: unreadCount,
            })}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div
        className="mb-6 flex flex-wrap gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search */}
        <div className="relative max-w-sm min-w-[200px] flex-1">
          <Search
            size={13}
            className="absolute top-1/2 left-3.5 -translate-y-1/2 text-[#9ca3af]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={adminT("admin_search_placeholder")}
            className="w-full border border-[#e5e7eb] bg-white py-2.5 pr-4 pl-9 font-sans text-sm transition-colors placeholder:text-[#c4c4c4] focus:border-[#163b0f] focus:outline-none"
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
            className="flex items-center gap-2 border border-[#e5e7eb] bg-white px-4 py-2.5 font-sans text-sm text-[#6b7280] transition-colors hover:border-[#163b0f]/30"
          >
            <SlidersHorizontal size={12} />
            <span>
              {currentSubjectLabel
                ? adminT(currentSubjectLabel.translationKey)
                : subjectFilter}
            </span>
            <ChevronDown
              size={12}
              className={`transition-transform ${showSubjectDrop ? "rotate-180" : ""}`}
            />
          </button>
          {showSubjectDrop && (
            <div className="absolute top-full left-0 z-20 mt-1 min-w-[190px] border border-[#e8e4df] bg-white py-1 shadow-lg">
              {SUBJECT_FILTER_KEYS.map(({ value, translationKey }) => (
                <button
                  key={value}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSubjectFilter(value)
                    setShowSubjectDrop(false)
                  }}
                  className={`block w-full px-4 py-2 text-left font-sans text-sm transition-colors hover:bg-[#f5f4f0] ${
                    subjectFilter === value
                      ? "font-semibold text-[#163b0f]"
                      : "text-[#6b7280]"
                  }`}
                >
                  {adminT(translationKey)}
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
            className="flex items-center gap-2 border border-[#e5e7eb] bg-white px-4 py-2.5 font-sans text-sm text-[#6b7280] transition-colors hover:border-[#163b0f]/30"
          >
            <span>
              {currentDateLabel
                ? adminT(currentDateLabel.translationKey)
                : dateSort}
            </span>
            <ChevronDown
              size={12}
              className={`transition-transform ${showDateDrop ? "rotate-180" : ""}`}
            />
          </button>
          {showDateDrop && (
            <div className="absolute top-full left-0 z-20 mt-1 min-w-[150px] border border-[#e8e4df] bg-white py-1 shadow-lg">
              {DATE_SORT_KEYS.map(({ value, translationKey }) => (
                <button
                  key={value}
                  onClick={(e) => {
                    e.stopPropagation()
                    setDateSort(value)
                    setShowDateDrop(false)
                  }}
                  className={`block w-full px-4 py-2 text-left font-sans text-sm transition-colors hover:bg-[#f5f4f0] ${
                    dateSort === value
                      ? "font-semibold text-[#163b0f]"
                      : "text-[#6b7280]"
                  }`}
                >
                  {adminT(translationKey)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="overflow-hidden rounded-xl border border-[#e8e4df] bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e8e4df] bg-[#f9f8f6]">
              <th className="w-8 px-4 py-3.5" />
              <th className="px-4 py-3.5 text-left font-sans text-[9px] font-bold tracking-widest text-[#9ca3af] uppercase">
                {adminT("admin_col_date")}
              </th>
              <th className="px-4 py-3.5 text-left font-sans text-[9px] font-bold tracking-widest text-[#9ca3af] uppercase">
                {adminT("admin_col_first_name")}
              </th>
              <th className="px-4 py-3.5 text-left font-sans text-[9px] font-bold tracking-widest text-[#9ca3af] uppercase">
                {adminT("admin_col_last_name")}
              </th>
              <th className="px-4 py-3.5 text-left font-sans text-[9px] font-bold tracking-widest text-[#9ca3af] uppercase">
                Email
              </th>
              <th className="px-4 py-3.5 text-left font-sans text-[9px] font-bold tracking-widest text-[#9ca3af] uppercase">
                {adminT("admin_col_subject")}
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-16 text-center font-sans text-sm text-[#9ca3af]"
                >
                  {adminT("admin_no_inquiries")}
                </td>
              </tr>
            ) : (
              filtered.map((inquiry) => (
                <>
                  {/* Main Row */}
                  <tr
                    key={inquiry.id}
                    onClick={() => toggleExpand(inquiry.id)}
                    className={`border-b border-[#e8e4df] transition-colors ${
                      expandedId === inquiry.id
                        ? "bg-[#f9f8f6]"
                        : "hover:bg-[#fafaf8]"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Expand chevron */}
                    <td className="w-8 px-4 py-4">
                      {expandedId === inquiry.id ? (
                        <ChevronDown size={13} className="text-[#163b0f]" />
                      ) : (
                        <ChevronRight size={13} className="text-[#c4c4c4]" />
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4">
                      <span className="font-sans text-sm text-[#6b7280]">
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
                        className={`font-sans text-sm ${
                          !inquiry.read
                            ? "font-semibold text-[#1a1a1a]"
                            : "text-[#6b7280]"
                        }`}
                      >
                        {inquiry.firstName}
                      </span>
                    </td>

                    {/* Last Name */}
                    <td className="px-4 py-4">
                      <span
                        className={`font-sans text-sm ${
                          !inquiry.read
                            ? "font-semibold text-[#1a1a1a]"
                            : "text-[#6b7280]"
                        }`}
                      >
                        {inquiry.lastName}
                      </span>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4">
                      <span className="font-sans text-sm text-[#6b7280]">
                        {inquiry.email}
                      </span>
                    </td>

                    {/* Subject */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {!inquiry.read && (
                          <span
                            className="h-2 w-2 flex-shrink-0 rounded-full bg-[#163b0f]"
                            title="Unread"
                          />
                        )}
                        <span
                          className={`rounded-full border px-2.5 py-1 font-sans text-[10px] font-semibold ${getSubjectStyle(
                            inquiry.subject,
                          )}`}
                        >
                          {translateSubject(inquiry.subject).length > 28
                            ? translateSubject(inquiry.subject).slice(0, 26) +
                              "…"
                            : translateSubject(inquiry.subject)}
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Message Row */}
                  {expandedId === inquiry.id && (
                    <tr
                      key={`${inquiry.id}-exp`}
                      className="border-b border-[#e8e4df] bg-[#f9f8f6]"
                    >
                      <td colSpan={6} className="px-10 py-6">
                        {/* Full subject line (in case it was truncated) */}
                        {translateSubject(inquiry.subject).length > 28 && (
                          <p className="mb-2 font-sans text-[10px] font-bold tracking-widest text-[#9ca3af] uppercase">
                            {translateSubject(inquiry.subject)}
                          </p>
                        )}

                        {/* Message body */}
                        <div className="mb-5 rounded-lg border border-[#e8e4df] bg-white px-5 py-4">
                          <p className="mb-2.5 font-sans text-[9px] font-bold tracking-widest text-[#9ca3af] uppercase">
                            {adminT("admin_message_label")}
                          </p>
                          <p className="font-sans text-sm leading-relaxed text-[#1a1a1a]">
                            {inquiry.message}
                          </p>
                        </div>

                        {/* Actions row */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          {!inquiry.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(inquiry.id)
                              }}
                              className="flex items-center gap-1.5 rounded-sm border border-[#163b0f]/25 px-4 py-2 font-sans text-[10px] font-bold tracking-widest text-[#163b0f] uppercase transition-all hover:border-[#163b0f] hover:bg-[#163b0f] hover:text-[#fbf6f1]"
                            >
                              <CheckCircle size={12} />
                              {adminT("admin_mark_read")}
                            </button>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteInquiry(inquiry.id)
                            }}
                            className="flex items-center gap-1.5 rounded-sm border border-red-200 px-4 py-2 font-sans text-[10px] font-bold tracking-widest text-red-500 uppercase transition-all hover:bg-red-50"
                          >
                            <Trash2 size={12} />
                            {adminT("admin_delete")}
                          </button>

                          <a
                            href={`mailto:${inquiry.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="ml-auto flex items-center gap-1.5 rounded-sm border border-[#e5e7eb] px-4 py-2 font-sans text-[10px] font-bold tracking-widest text-[#6b7280] uppercase transition-all hover:border-[#163b0f]/30 hover:bg-white"
                          >
                            <Mail size={12} />
                            {adminT("admin_reply_email")}
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
