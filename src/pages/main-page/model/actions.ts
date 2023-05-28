import {
  ChatHistoryObjectType,
  ChatHistoryType,
} from 'shared/api/greenApi'
import { ChatType } from 'shared/api/localForage'

import { types } from '.'

export const setShouldUpdateHistory = (
  id: string,
  shouldUpdate: boolean
): types.setShouldUpdateHistoryActionType => ({
  type: types.SET_SHOULD_UPDATE_HISTORY,
  payload: { id, shouldUpdate },
})

export const setChatList = (
  chatList: ChatType[]
): types.setChatListActionType => ({
  type: types.SET_CHAT_LIST,
  chatList,
})

export const setOpenedChat = (
  chatId: string
): types.setOpenedChatType => ({
  type: types.SET_OPENED_CHAT,
  chatId,
})

export const setChatHistory = (
  chatHistory: ChatHistoryType
): types.setChatHistoryType => ({
  type: types.SET_CHAT_HISTORY,
  chatHistory,
})

export const addNewMessageToHistory = (
  message: ChatHistoryObjectType
): types.addNewMessageToHistory => ({
  type: types.ADD_NEW_MESSAGE_TO_HISTORY,
  message,
})
