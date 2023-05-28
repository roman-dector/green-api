import { AppThunk } from 'app/providers'
import { credsAPI, chatAPI, ChatType } from 'shared/api/localForage'
import { actions as chatActions } from '.'
import { messageAPI } from 'shared/api/greenApi'
import { ChatListItemType } from './reducers'

export const getChatList = (): AppThunk => async dispatch => {
  const chatList = await chatAPI.getChatList()
  dispatch(chatActions.setChatList(chatList))
}

export const addChat =
  (chat: ChatType): AppThunk =>
  async dispatch => {
    await chatAPI.addChat(chat)
    dispatch(getChatList())
  }

export const getChatHistory =
  (chat: ChatListItemType, count: number = 100): AppThunk =>
  async dispatch => {
    if (chat.shouldUpdateHist) {
      await chatAPI.updateChatHistory(chat.id, count)
      dispatch(chatActions.setShouldUpdateHistory(chat.id, false))
    }
    chatAPI.getChat(chat.id).then(chat => {
      if (chat) {
        dispatch(chatActions.setChatHistory(chat.chatHistory))
      }
    })
  }

export const getForceChatHistory =
  (chatId: string, count: number = 100): AppThunk =>
  async dispatch => {
    debugger
    chatAPI
      .updateChatHistory(chatId, count)
      .then(() => {
        return chatAPI.getChat(chatId)
      })
      .then(chat => {
        if (chat) {
          debugger
          dispatch(chatActions.setChatHistory(chat.chatHistory))
        }
      })
  }

export const sendMessage =
  (chatId: string, message: string): AppThunk =>
  async dispatch => {
    const creds = await credsAPI.getCreds()
    if (creds) {
      return messageAPI.sendMessage(creds, { chatId, message })
    }
  }

export const startNotificationsObserver =
  (): AppThunk => async (dispatch, getState) => {
    const creds = await credsAPI.getCreds()
    if (creds) {
      setInterval(() => {
        messageAPI
          .receiveNotification(creds)
          .then(res => {
            if (res.data === null) {
              return null
            }
            // const openedChatId =
            //   getState().chatState.chatWindow.openedChatListId

            debugger
            switch (res.data.body?.typeWebhook) {
              case 'incomingMessageReceived':
              case 'outgoingMessageReceived':
              case 'outgoingAPIMessageReceived':
                debugger
                const chatId = res.data.body.senderData.chatId
                dispatch(getForceChatHistory(chatId))

              // if (openedChatId && openedChatId === chatId) {
              //   chatAPI
              //     .updateChatHistory(chatId)
              //     .then(() => chatAPI.getChat(chatId))
              //     .then(chat => {
              //       if (chat) {
              //         dispatch(
              //           chatActions.setChatHistory(chat.chatHistory)
              //         )
              //       }
              //     })
              // } else {
              //   dispatch(
              //     chatActions.setShouldUpdateHistory(chatId, true)
              //   )
              // }
            }
            return res.data.receiptId
          })
          .then(receiptId => {
            if (receiptId) {
              messageAPI.deleteNotification(creds, receiptId)
            }
          })
      }, 5000)
    }
  }
