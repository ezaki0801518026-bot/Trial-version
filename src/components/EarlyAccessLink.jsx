import { useLanguage } from '../i18n/LanguageContext.jsx'
import { earlyAccessUrl } from '../config/earlyAccess.js'

// Trial version: the button to the early access list. `from` names where it
// sits; `kind` picks the wording — "join" for the site as a whole, "notify"
// beside a feature that is locked in the trial.
function EarlyAccessLink({ from, kind = 'join', className = '' }) {
  const { t, lang } = useLanguage()
  return (
    <a
      className={`btn btn-primary ${className}`}
      href={earlyAccessUrl(from, lang)}
      target="_blank"
      rel="noopener"
      data-early-access={from}
    >
      {t(kind === 'notify' ? 'earlyAccessNotify' : 'earlyAccessJoin')}
      <span className="sr-only"> {t('earlyAccessNewTab')}</span>
    </a>
  )
}

export default EarlyAccessLink
