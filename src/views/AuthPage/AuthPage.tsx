import styles from './AuthPage.module.css'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authOperations } from '../../store/ducks/auth'
import { selectAuthQRBase64 } from '../../store/ducks/auth/selectors'
import { authSelectors } from '../../store/ducks/auth'

export const AuthPage: FC = () => {
  const dispatch = useDispatch()
  const authQRBase64 = useSelector(selectAuthQRBase64)

  const isUserAuthed: boolean = useSelector(
    authSelectors.selectIsUserAuthed
  )

  const requestQR = () => {
    let id
    if (!isUserAuthed) {
      id = setInterval(() => {
        dispatch(authOperations.authMe())
        dispatch(authOperations.getAuthQR())
      }, 5000)
    } else {
      clearTimeout(id)
    }
  }

  // периодически кидает runtime errors 429 и + 500 статус коды
  useEffect(requestQR)

  return (
    <div className={styles['auth-page']}>
      <div className={styles['title']}>
        Отсканируйте QR код с помощью приложения WhatsApp
      </div>
      <img
        className={styles['qr-code']}
        src={`data:image/png;base64,${authQRBase64}`}
        alt='auth qr code'
      />
    </div>
  )
}
