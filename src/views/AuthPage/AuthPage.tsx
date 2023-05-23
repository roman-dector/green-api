import styles from './AuthPage.module.css'
import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authOperations } from '../../store/ducks/auth'
import { selectAuthQRBase64 } from '../../store/ducks/auth/selectors'

export const AuthPage: FC = () => {
  const dispatch = useDispatch()
  const authQRBase64 = useSelector(selectAuthQRBase64)

  useEffect(() => {
    let id = setInterval(() => {
      try {
        dispatch(authOperations.authMe())
        dispatch(authOperations.getAuthQR())
      } catch (err) {
        console.log(err)
      }
    }, 5000)

    return () => {
      clearTimeout(id)
      window.location.reload()
    }
  }, [])

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
