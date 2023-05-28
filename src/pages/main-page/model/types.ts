import {
  ChatHistoryType,
  ChatHistoryObjectType,
} from 'shared/api/greenApi'
import { ChatType } from 'shared/api/localForage'

export const SET_CHAT_LIST = 'social-network/app/SET_CHAT_LIST'
export const SET_OPENED_CHAT = 'social-network/app/SET_OPENED_CHAT'
export const SET_CHAT_HISTORY = 'social-network/app/SET_CHAT_HISTORY'
export const ADD_NEW_MESSAGE_TO_HISTORY =
  'social-network/app/ADD_NEW_MESSAGE_TO_HISTORY'
export const SET_SHOULD_UPDATE_HISTORY =
  'social-network/app/SET_SHOULD_UPDATE_HISTORY'

export type setShouldUpdateHistoryActionType = {
  type: typeof SET_SHOULD_UPDATE_HISTORY
  payload: { id: string; shouldUpdate: boolean }
}

export type setChatListActionType = {
  type: typeof SET_CHAT_LIST
  chatList: ChatType[]
}

export type setOpenedChatType = {
  type: typeof SET_OPENED_CHAT
  chatId: string
}

export type setChatHistoryType = {
  type: typeof SET_CHAT_HISTORY
  chatHistory: ChatHistoryType
}

export type addNewMessageToHistory = {
  type: typeof ADD_NEW_MESSAGE_TO_HISTORY
  message: ChatHistoryObjectType
}

export type CombinedChatListReducerActionType =
  | setChatListActionType
  | setShouldUpdateHistoryActionType

export type CombinedChatWindowReducerActionType =
  | setOpenedChatType
  | setChatHistoryType
  | addNewMessageToHistory
