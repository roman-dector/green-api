import { types } from '.'
import { ChatHistoryType } from 'shared/api/greenApi'
import { combineReducers } from '@reduxjs/toolkit'

export type ChatListItemType = {
  id: string
  name: string
  shouldUpdateHist: boolean
}

export type chatListStateType = {
  chatList: ChatListItemType[]
}

const chatListState: chatListStateType = {
  chatList: [],
}

type chatWindowStateType = {
  openedChatListId: string | null
  chatHistory: ChatHistoryType | []
}

const chatWindowState = {
  openedChatListId: null,
  chatHistory: [],
}

const chatWindowReducer = (
  state: chatWindowStateType = chatWindowState,
  action: types.CombinedChatWindowReducerActionType
): chatWindowStateType => {
  switch (action.type) {
    case types.SET_OPENED_CHAT:
      return {
        ...state,
        openedChatListId: action.chatId,
      }

    case types.SET_CHAT_HISTORY:
      return {
        ...state,
        chatHistory: action.chatHistory,
      }

    case types.ADD_NEW_MESSAGE_TO_HISTORY:
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.message],
      }

    default:
      return state
  }
}

const chatListReducer = (
  state: chatListStateType = chatListState,
  action: types.CombinedChatListReducerActionType
): chatListStateType => {
  switch (action.type) {
    case types.SET_CHAT_LIST:
      return {
        ...state,
        chatList: action.chatList.map(c => {
          return {
            id: c.id,
            name: c.name,
            unreadCount: c.unreadCount,
            shouldUpdateHist: true,
          }
        }),
      }

    case types.SET_SHOULD_UPDATE_HISTORY:
      return {
        ...state,
        chatList: state.chatList.map(c =>
          c.id === action.payload.id
            ? {
                id: c.id,
                name: c.name,
                shouldUpdateHist: action.payload.shouldUpdate,
              }
            : c
        ),
      }

    default:
      return state
  }
}

export default combineReducers({
  chatList: chatListReducer,
  chatWindow: chatWindowReducer,
})
