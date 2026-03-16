import { createContext, useContext, useState, useCallback } from "react"
import type { ReactNode } from "react"

type ConsentStatus = "undecided" | "accepted" | "rejected"

interface CookieConsentState {
  status: ConsentStatus
  showBanner: boolean
  accept: () => void
  reject: () => void
  openSettings: () => void
}

const STORAGE_KEY = "cookie_consent"
const TWELVE_MONTHS_MS = 365 * 24 * 60 * 60 * 1000

function readConsent(): { status: ConsentStatus; timestamp: number } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed.status || !parsed.timestamp) return null
    // Re-prompt if consent is older than 12 months
    if (Date.now() - parsed.timestamp > TWELVE_MONTHS_MS) return null
    return parsed
  } catch {
    return null
  }
}

function writeConsent(status: ConsentStatus) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ status, timestamp: Date.now() }),
  )
}

const CookieConsentContext = createContext<CookieConsentState | null>(null)

export const CookieConsentProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const stored = readConsent()
  const [status, setStatus] = useState<ConsentStatus>(
    stored?.status ?? "undecided",
  )
  const [showBanner, setShowBanner] = useState(stored === null)

  const accept = useCallback(() => {
    setStatus("accepted")
    writeConsent("accepted")
    setShowBanner(false)
  }, [])

  const reject = useCallback(() => {
    setStatus("rejected")
    writeConsent("rejected")
    setShowBanner(false)
  }, [])

  const openSettings = useCallback(() => {
    setShowBanner(true)
  }, [])

  return (
    <CookieConsentContext.Provider
      value={{ status, showBanner, accept, reject, openSettings }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext)
  if (!ctx)
    throw new Error(
      "useCookieConsent must be used within CookieConsentProvider",
    )
  return ctx
}
