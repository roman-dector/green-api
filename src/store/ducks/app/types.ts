export const SET_IS_APP_INITIALIZED =
  'social-network/app/SET_IS_APP_INITIALIZED'

export const SET_IS_CREDS_PROVIDED =
  'social-network/app/SET_IS_CREDS_PROVIDED'

export type setIsAppInitializedActionType = {
  type: typeof SET_IS_APP_INITIALIZED
  isAppInitialized: boolean
}

export type setIsCredsProvidedActionType = {
  type: typeof SET_IS_CREDS_PROVIDED
  isCredsProvided: boolean
}

export type CombinedAppReducerActionType =
  | setIsAppInitializedActionType
  | setIsCredsProvidedActionType
