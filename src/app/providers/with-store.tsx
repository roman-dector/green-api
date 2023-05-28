import { FC } from 'react'
import { Provider } from 'react-redux'
import {
  configureStore,
  combineReducers,
  AnyAction,
  ThunkAction,
} from '@reduxjs/toolkit'

import { state as appState } from 'app/model'
import { state as authPageState } from 'pages/auth-page/model'
import { state as mainPageState } from 'pages/main-page/model'

const store = configureStore({
  reducer: combineReducers({
    appState,
    authPageState,
    mainPageState,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>

declare global {
  interface Window {
    __store__: any
  }
}
window.__store__ = store

export const withStore = (Component: FC<any>) => (props: any) =>
  (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  )
