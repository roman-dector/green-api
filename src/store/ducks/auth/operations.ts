import { authAPI } from '../../../dal/greenApi'
import { credsAPI } from '../../../dal/localForage'
import { AppThunk } from '../../store'
import { authActions } from '../auth'

export const authMe = (): AppThunk => async dispatch => {
  const creds = await credsAPI.getCreds()

  if (!creds) return

  let resp = await authAPI.getStateInstance(creds)
  switch (resp.data.stateInstance) {
    case 'authorized':
      dispatch(authActions.setIsUserAuthed(true))
      return
    default:
      dispatch(authActions.setIsUserAuthed(false))
  }
}

export const logout = (): AppThunk => async dispatch => {
  const creds = await credsAPI.getCreds()

  if (!creds) return

  let resp = await authAPI.logout(creds)
  if (resp.data.isLogout) {
    dispatch(authActions.setIsUserAuthed(false))
  }
}

export const getAuthQR = (): AppThunk => async dispatch => {
  const creds = await credsAPI.getCreds()

  if (!creds) return

  let resp = await authAPI.getAuthQR(creds)
  if (resp.data.type === 'qrCode') {
    dispatch(authActions.setAuthQR(resp.data.message))
  }
}
