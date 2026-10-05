// Trial version: the assistant is switched off.
//
// This file replaces the full chat endpoint of the main site. Nothing here
// reads an API key or calls the Anthropic API, so the trial deployment has no
// connection to Claude at all, whatever secrets the Cloudflare project holds.
// The interface does not offer the assistant either (see TrialLock and the
// home page's ask form); this is the server-side half of the same switch.

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })
}

// Kept so the deployed commit can still be read from a browser, as on the
// main site; `ready` is always false and `trial` says why.
export function onRequestGet({ env }) {
  return json(
    {
      code: 'method_not_allowed',
      ready: false,
      trial: true,
      commit: (env.CF_PAGES_COMMIT_SHA || '').slice(0, 7),
    },
    405
  )
}

export function onRequestPost() {
  return json({ error: 'trial', message: 'Not available in the trial version.' }, 403)
}
