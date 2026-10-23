// One address for the trial version: https://trial.wa-chain.org
//
// The Cloudflare Pages project also answers at trial-version.pages.dev, which
// LinkedIn and some mail filters block. Requests to that production address
// are sent, with a permanent redirect, to the same path on trial.wa-chain.org.
// Branch previews (<branch>.trial-version.pages.dev) are left alone.
//
// Merge this only after trial.wa-chain.org shows "Active" under the project's
// Custom domains.

const CANONICAL = 'https://trial.wa-chain.org'
const OLD_HOST = 'trial-version.pages.dev'

export async function onRequest({ request, next }) {
  const url = new URL(request.url)
  if (url.hostname === OLD_HOST) {
    const status = request.method === 'GET' || request.method === 'HEAD' ? 301 : 308
    return Response.redirect(`${CANONICAL}${url.pathname}${url.search}`, status)
  }
  return next()
}
