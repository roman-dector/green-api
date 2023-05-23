import styles from './App.module.css'

import { useEffect, FC } from 'react'
import { useDispatch, useSelector, Provider } from 'react-redux'
import { initializeApp } from '../../store/ducks/app/operations'
import { appSelectors } from '../../store/ducks/app'
import { authSelectors } from '../../store/ducks/auth'
import store from '../../store/store'

import { AskCredsPage } from '../AskCredsPage/AskCredsPage'
import { AuthPage } from '../AuthPage/AuthPage'
import { SideBar } from '../SideBar/SideBar'
import { ChatWindow } from '../ChatWindow/ChatWindow'

const App: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  const isAppInitialized: boolean = useSelector(
    appSelectors.selectIsAppInitialized
  )
  const isCredsProvided: boolean = useSelector(
    appSelectors.selectIsCredsProvided
  )
  const isUserAuthed: boolean = useSelector(
    authSelectors.selectIsUserAuthed
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
      {/* <button
        onClick={() => {
          dispatch(authOperations.logout())
        }}
      >
        LogOut
      </button> */}
    </div>
  )
}

const withStore = (Component: FC<any>) => (props: any) =>
  (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  )

export default withStore(App)
