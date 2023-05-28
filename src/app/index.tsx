import './index.css'
import styles from './App.module.css'

import { useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withProviders } from './providers'

import { AskCredsPage } from 'pages/ask-creds-page/AskCredsPage'
import { AuthPage } from 'pages/auth-page/AuthPage'
import { SideBar } from 'widgets/side-bar'
import { ChatWindow } from 'widgets/chat-window'
import { operations, selectors } from 'app/model'
import { authPageModel } from 'pages/auth-page'

const App: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(operations.initializeApp())
  }, [])

  const isAppInitialized: boolean = useSelector(
    selectors.selectIsAppInitialized
  )
  const isCredsProvided: boolean = useSelector(
    selectors.selectIsCredsProvided
  )
  const isUserAuthed: boolean = useSelector(
    authPageModel.selectors.selectIsUserAuthed
  )

  if (!isAppInitialized) {
    return <div className={styles['center']}>Please wait</div>
  }

  if (!isCredsProvided) {
    return (
      <div className={styles['app']}>
        <div className={styles['center']}>
          <AskCredsPage />
        </div>
      </div>
    )
  }

  if (!isUserAuthed) {
    return (
      <div className={styles['app']}>
        <div className={styles['center']}>
          <AuthPage />
        </div>
      </div>
    )
  }

  return (
    <div className={styles['app']}>
      <SideBar />
      <ChatWindow />
    </div>
  )
}

export default withProviders(App)
