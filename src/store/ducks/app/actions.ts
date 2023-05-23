import * as types from './types'

export const setIsAppInitialized = (
  isAppInitialized: boolean
): types.setIsAppInitializedActionType => ({
  type: types.SET_IS_APP_INITIALIZED,
  isAppInitialized,
})

export const setIsCredsProvided = (
  isCredsProvided: boolean
): types.setIsCredsProvidedActionType => ({
  type: types.SET_IS_CREDS_PROVIDED,
  isCredsProvided,
})
