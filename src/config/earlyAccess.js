// Trial version: links to the WA-Chain Edu early access list (waitlist).
//
// Each button says which part of the site it sits in (`from`), and the
// channel the visitor was sent through (`src`, e.g. ?src=interview on the
// link we shared) is carried along, so the waitlist can count sign-ups by
// both. Only the fixed values below are passed on.

// The waitlist's public address: its own subdomain of wa-chain.org (the
// Cloudflare Pages project in the Wait-List repository; the old pages.dev
// address redirects here).
export const WAITLIST_URL = 'https://early.wa-chain.org/'

// Keep in sync with SOURCES / ENTRIES in Wait-List public/shared.js.
const SOURCES = [
  'dm', 'interview', 'interview-demo', 'linkedin', 'email',
  // Communities we post in (see WA-Chain 売り込み先_コンタクト・投稿手順)
  'iccrom', 'aca', 'bpg', 'iamabookbinder', 'gbw', 'papermaking',
]
export const ENTRIES = [
  'hero', 'about', 'chat', 'washimap', 'lexicon', 'tour',
  'pricing', 'lessons', 'glossary', 'community', 'cohort',
]

const KEY = 'wa-trial-src'

// The ?src= the visitor arrived with. Remembered for this tab, so it is
// still known after moving to /about/ (a separate page without the query).
function arrivalSource() {
  let src = null
  try {
    // ?src= is ours; ?utm_source= is what LinkedIn posts carry (2026-10-27).
    const params = new URLSearchParams(window.location.search)
    const value = (params.get('src') || params.get('utm_source') || '').toLowerCase()
    if (SOURCES.includes(value)) {
      src = value
      sessionStorage.setItem(KEY, value)
    } else {
      const saved = sessionStorage.getItem(KEY)
      if (SOURCES.includes(saved)) src = saved
    }
  } catch {
    // Storage blocked: the current page's query still counts.
  }
  return src
}

export function earlyAccessUrl(from, lang) {
  const url = new URL(WAITLIST_URL)
  const src = arrivalSource()
  if (src) url.searchParams.set('src', src)
  if (ENTRIES.includes(from)) url.searchParams.set('from', from)
  if (lang === 'ja') url.searchParams.set('lang', 'ja')
  return url.toString()
}

// Run once on load so the channel is remembered even if the visitor never
// presses a button on the first page.
arrivalSource()
