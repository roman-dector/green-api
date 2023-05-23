import { AppThunk } from '../../store'
import { credsAPI, chatAPI } from '../../../dal/localForage'
import { appActions } from '.'
import { chatOperations } from '../chat'
import { authOperations } from '../auth'

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
    dispatch(authOperations.authMe()),
  ])
    .then(res => {
      chatAPI.cacheChatsHistory()
    })
    .then(() => {
      dispatch(appActions.setIsAppInitialized(true))
    })
    .then(() => {
      dispatch(chatOperations.startNotificationsObserver())
    })
}
