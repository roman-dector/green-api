import { types } from '.'

export const setIsUserAuthed = (
  isUserAuthed: boolean
): types.SetIsUserAuthedActionType => ({
  type: types.SET_IS_USER_AUTHED,
  isUserAuthed,
})

export const setIsAuthenticating = (
  isAuthenticating: boolean
): types.SetIsAuthenticatingActionType => ({
  type: types.SET_IS_AUTHENTICATING,
  isAuthenticating,
})

export const setAuthQR = (
  authQRBase64: string
): types.SetAuthQRActionType => ({
  type: types.SET_AUTH_QR,
  authQRBase64,
})
