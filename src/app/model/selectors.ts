import { RootState } from 'app/providers'

export const selectIsAppInitialized = (state: RootState): boolean =>
  state.appState.isAppInitialized

export const selectIsCredsProvided = (state: RootState): boolean =>
  state.appState.isCredsProvided
