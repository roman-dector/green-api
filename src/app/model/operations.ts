import { AppThunk } from 'app/providers'
import { credsAPI, chatAPI } from 'shared/api/localForage'
import { mainPageModel } from 'pages/main-page'
import { authPageModel } from 'pages/auth-page'
import { actions as appActions } from '.'

export const checkCreds = (): AppThunk => dispatch => {
  credsAPI.isCredsProvided().then(res => {
    return dispatch(appActions.setIsCredsProvided(res))
  })
}

export const saveCreds =
  (idInstance: number, apiTokenInstance: string): AppThunk =>
  async dispatch => {
    await credsAPI.saveCreds(idInstance, apiTokenInstance)
    dispatch(appActions.setIsCredsProvided(true))
  }

export const removeCreds = (): AppThunk => async dispatch => {
  await credsAPI.removeCreds()
  dispatch(appActions.setIsCredsProvided(false))
}

export const initializeApp = (): AppThunk => dispatch => {
  Promise.all([
    dispatch(checkCreds()),
    dispatch(authPageModel.operations.authMe()),
  ])
    .then(res => {
      chatAPI.cacheChatsHistory()
    })
    .then(() => {
      dispatch(appActions.setIsAppInitialized(true))
    })
    .then(() => {
      dispatch(mainPageModel.operations.startNotificationsObserver())
    })
}
