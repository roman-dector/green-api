import { combineReducers } from '@reduxjs/toolkit'
import { types } from '.'

const authState = {
  isUserAuthed: false,
  isAuthenticating: false,
}

type AuthStateType = typeof authState

const authQRState = {
  authQRBase64: null as string | null,
}

type AuthQRStateType = typeof authQRState

const authReducer = (
  state: AuthStateType = authState,
  action: types.CombinedAuthReducerActionType
): AuthStateType => {
  switch (action.type) {
    case types.SET_IS_USER_AUTHED:
      return {
        ...state,
        isUserAuthed: action.isUserAuthed,
      }
    case types.SET_IS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.isAuthenticating,
      }
    default:
      return state
  }
}

const authQRReducer = (
  state: AuthQRStateType = authQRState,
  action: types.CombinedAuthQRReducerActionType
): AuthQRStateType => {
  switch (action.type) {
    case types.SET_AUTH_QR:
      return {
        ...state,
        authQRBase64: action.authQRBase64,
      }
    default:
      return state
  }
}

export default combineReducers({
  auth: authReducer,
  authQR: authQRReducer,
})
