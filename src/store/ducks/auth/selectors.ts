import { RootState } from '../../store'

export const selectIsUserAuthed = (state: RootState): boolean =>
  state.authState.auth.isUserAuthed
export const selectIsAuthenticating = (state: RootState): boolean =>
  state.authState.auth.isAuthenticating

export const selectAuthQRBase64 = (state: RootState): string | null =>
  state.authState.authQR.authQRBase64

// export const selectLoggedUserId = (state: RootState): number =>
//   state.authState.loggedUser.id
