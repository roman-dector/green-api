import { ChatHistoryType } from 'shared/api/greenApi'
import { RootState } from 'app/providers'
import { ChatListItemType } from './reducers'

export const selectChatList = (
  state: RootState
): {
  id: string
  name: string
  shouldUpdateHist: boolean
}[] => state.mainPageState.chatList.chatList

export const selectOpenedChat = (
  state: RootState
): ChatListItemType | undefined => {
  let openedChatListId: string | null
  if (
    (openedChatListId =
      state.mainPageState.chatWindow.openedChatListId)
  ) {
    return state.mainPageState.chatList.chatList.find(
      c => c.id === openedChatListId
    )
  }
}

export const selectChatHistory = (
  state: RootState
): ChatHistoryType | null =>
  state.mainPageState.chatWindow.chatHistory
