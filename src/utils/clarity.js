// Microsoft Clarity for the trial version: where people click and how far
// they read. Off unless the Cloudflare Pages project has VITE_CLARITY_ID set
// (it is read at build time), so nothing loads and no consent box appears
// until then.
//
// Consent: Clarity measures visitors from Japan, the US and elsewhere as
// usual, but for the EEA, the UK and Switzerland it needs a consent signal.
// The first-visit dialog carries an unticked box; ticking it sends that
// signal (analytics only; nothing is shared with Microsoft Ads), unticking it
// withdraws it. The choice is kept in this browser and re-sent on each visit.
export const CLARITY_ID = (import.meta.env.VITE_CLARITY_ID || '').trim()
export const clarityOn = /^[a-z0-9]{6,20}$/i.test(CLARITY_ID)

const KEY = 'wa-trial-measure' // 'granted' | 'denied'

export function readConsent() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

function signal(granted) {
  if (!clarityOn || typeof window.clarity !== 'function') return
  window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: granted ? 'granted' : 'denied' })
}

export function setConsent(granted) {
  try {
    localStorage.setItem(KEY, granted ? 'granted' : 'denied')
  } catch {
    /* not remembered; still applies to this page */
  }
  signal(granted)
}

// Load once per page. Standard Clarity snippet, written out.
export function loadClarity() {
  if (!clarityOn || typeof window === 'undefined' || window.clarity) return
  window.clarity = function clarityQueue() {
    ;(window.clarity.q = window.clarity.q || []).push(arguments)
  }
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`
  document.head.appendChild(script)
  // A choice made on an earlier visit is sent again right away.
  const saved = readConsent()
  if (saved === 'granted') signal(true)
  else if (saved === 'denied') signal(false)
}
