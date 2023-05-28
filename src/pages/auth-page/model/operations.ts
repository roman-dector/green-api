import { authAPI } from 'shared/api/greenApi'
import { credsAPI } from 'shared/api/localForage'
import { AppThunk } from 'app/providers'
import { authPageModel } from 'pages/auth-page'

export const authMe = (): AppThunk => async dispatch => {
  const creds = await credsAPI.getCreds()

  if (!creds) return

  let resp = await authAPI.getStateInstance(creds)
  switch (resp.data.stateInstance) {
    case 'authorized':
      dispatch(authPageModel.actions.setIsUserAuthed(true))
      return
    default:
      dispatch(authPageModel.actions.setIsUserAuthed(false))
  }
}

export const logout = (): AppThunk => async dispatch => {
  const creds = await credsAPI.getCreds()

  if (!creds) return

  let resp = await authAPI.logout(creds)
  if (resp.data.isLogout) {
    dispatch(authPageModel.actions.setIsUserAuthed(false))
  }
}

export const getAuthQR = (): AppThunk => async dispatch => {
  const creds = await credsAPI.getCreds()

  if (!creds) return

  let resp = await authAPI.getAuthQR(creds)
  if (resp.data.type === 'qrCode') {
    dispatch(authPageModel.actions.setAuthQR(resp.data.message))
  }
}
