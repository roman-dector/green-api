import localforage from 'localforage'
import { ChatHistoryType, journalAPI } from './greenApi'

export const credsAPI = {
  async saveCreds(idInstance: number, apiTokenInstance: string) {
    return await localforage.setItem('creds', {
      idInstance,
      apiTokenInstance,
    })
  },

  async removeCreds() {
    return await localforage.removeItem('creds')
  },

  async getCreds() {
    return await localforage.getItem<{
      idInstance: number
      apiTokenInstance: string
    }>('creds')
  },

  async isCredsProvided() {
    const creds = await this.getCreds()
    if (creds?.idInstance && creds?.apiTokenInstance) {
      return true
    }
    return false
  },
}

export type ChatType = {
  id: string
  name: string
  unreadCount: number
  chatHistory: ChatHistoryType
}

export const chatAPI = {
  async getChatList() {
    return (await localforage.getItem<ChatType[]>('chatList')) || []
  },

  async addChat(chat: ChatType) {
    let chatList =
      (await localforage.getItem<ChatType[]>('chatList')) || []

    let newChat = {
      id: chat.id,
      name: chat.name,
      unreadCount: 0,
      chatHistory: [],
    }

    return await localforage.setItem('chatList', [
      ...chatList,
      newChat,
    ])
  },

  async getChat(chatId: string) {
    const chatList = await this.getChatList()
    return chatList.find(c => c.id === chatId)
  },

  async updateChatHistory(chatId: string, count: number = 100) {
    const creds = await credsAPI.getCreds()
    if (creds) {
      let resp = await journalAPI.getChatHistory(creds, chatId, count)
      debugger
      let chatList = await this.getChatList()
      chatList.forEach(c => {
        if (c.id === chatId) {
          c.chatHistory = resp.data
        }
      })
      localforage.setItem('chatList', chatList)
    }
  },

  async cacheChatsHistory() {
    const creds = await credsAPI.getCreds()
    if (creds) {
      const chatList = await this.getChatList()
      for (let chat of chatList) {
        try {
          let resp = await journalAPI.getChatHistory(
            creds,
            chat.id,
            100
          )
          chat.chatHistory = resp.data
        } catch (err) {
          console.log(`Chat: ${chat.id} Error: ${err}`)
        }
      }

      await localforage.setItem('chatList', chatList)
    }
  },
}
