import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import EarlyAccessLink from './EarlyAccessLink.jsx'
import styles from './TrialLock.module.css'

// Trial version: a feature that exists but is not open in the trial.
// The page keeps its title above this; everything passed in here is shown
// blurred, cannot be reached by pointer, keyboard or screen reader, and
// carries one line saying it is not available in the trial, with a button
// to the early access list (`from` names the feature for the sign-up count).
function TrialLock({ children, from }) {
  const { t } = useLanguage()
  const contentRef = useRef(null)

  // React 18 does not pass `inert` through as a boolean attribute.
  useEffect(() => {
    contentRef.current?.setAttribute('inert', '')
  }, [])

  return (
    <div className={styles.lock}>
      <div ref={contentRef} className={styles.content} aria-hidden="true">
        {children}
      </div>
      <div className={styles.overlay}>
        <div className={styles.panel}>
          <p className={styles.message} role="note">
            {t('trialUnavailable')}
          </p>
          {from && <EarlyAccessLink from={from} kind="notify" />}
        </div>
      </div>
    </div>
  )
}

export default TrialLock
