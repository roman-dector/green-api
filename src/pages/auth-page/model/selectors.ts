import { RootState } from 'app/providers'

export const selectIsUserAuthed = (state: RootState): boolean =>
  state.authPageState.auth.isUserAuthed
export const selectIsAuthenticating = (state: RootState): boolean =>
  state.authPageState.auth.isAuthenticating

export const selectAuthQRBase64 = (state: RootState): string | null =>
  state.authPageState.authQR.authQRBase64
