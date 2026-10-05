import WaitlistForm from '../components/WaitlistForm.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import styles from './CommunityPage.module.css'
import PrototypeNotice from '../components/PrototypeNotice.jsx'
import TrialLock from '../components/TrialLock.jsx'

function CommunityPage() {
  const { t } = useLanguage()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t('communityTitle')}</h1>
      <TrialLock>
      <PrototypeNotice messageKey="prototypeNoticeGeneral" />
      <p className={styles.description}>{t('communityDescription')}</p>
      <ul className={styles.pointList}>
        <li>{t('communityPoint1')}</li>
        <li>{t('communityPoint2')}</li>
        <li>{t('communityPoint3')}</li>
      </ul>
      <p className={styles.status}>{t('communityStatus')}</p>
      <WaitlistForm context="community" buttonLabel={t('communityCta')} />
      </TrialLock>
    </div>
  )
}

export default CommunityPage
