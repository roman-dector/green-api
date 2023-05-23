import * as types from './types'

export type InitialStateType = {
  isAppInitialized: boolean
  isCredsProvided: boolean
}

const initialState: InitialStateType = {
  isAppInitialized: false,
  isCredsProvided: false,
}

const appReducer = (
  state: InitialStateType = initialState,
  action: types.CombinedAppReducerActionType
): InitialStateType => {
  switch (action.type) {
    case types.SET_IS_APP_INITIALIZED:
      return {
        ...state,
        isAppInitialized: action.isAppInitialized,
      }

    case types.SET_IS_CREDS_PROVIDED:
      return {
        ...state,
        isCredsProvided: action.isCredsProvided,
      }

    default:
      return state
  }
}

export default appReducer
