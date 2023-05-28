export const SET_IS_USER_AUTHED =
  'social-network/auth/SET_IS_USER_AUTHED'
export const SET_IS_AUTHENTICATING =
  'social-network/auth/SET_IS_AUTHENTICATING'

export const SET_AUTH_QR = 'social-network/auth/SET_AUTH_QR'

export type SetIsUserAuthedActionType = {
  type: typeof SET_IS_USER_AUTHED
  isUserAuthed: boolean
}

export type SetIsAuthenticatingActionType = {
  type: typeof SET_IS_AUTHENTICATING
  isAuthenticating: boolean
}

export type SetAuthQRActionType = {
  type: typeof SET_AUTH_QR
  authQRBase64: string
}

export type CombinedAuthReducerActionType =
  | SetIsUserAuthedActionType
  | SetIsAuthenticatingActionType

export type CombinedAuthQRReducerActionType = SetAuthQRActionType
