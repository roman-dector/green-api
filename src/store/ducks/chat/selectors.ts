import { ChatHistoryType } from '../../../dal/greenApi'
import { RootState } from '../../store'
import { ChatListItemType } from './reducers'

export const selectChatList = (
  state: RootState
): {
  id: string
  name: string
  shouldUpdateHist: boolean
}[] => state.chatState.chatList.chatList

export const selectOpenedChat = (
  state: RootState
): ChatListItemType | undefined => {
  let openedChatListId: string | null
  if (
    (openedChatListId = state.chatState.chatWindow.openedChatListId)
  ) {
    return state.chatState.chatList.chatList.find(
      c => c.id === openedChatListId
    )
  }
}

export const selectChatHistory = (
  state: RootState
): ChatHistoryType | null => state.chatState.chatWindow.chatHistory
