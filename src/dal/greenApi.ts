import axios, { AxiosResponse } from 'axios'

const authInst = axios.create({
  baseURL: 'https://api.green-api.com',
})

type CredsType = {
  idInstance: number
  apiTokenInstance: string
}

export const authAPI = {
  async getStateInstance(creds: CredsType): Promise<AxiosResponse> {
    return await authInst.get(
      `waInstance${creds.idInstance}/getStateInstance/${creds.apiTokenInstance}`
    )
  },
  async getAuthQR(creds: CredsType): Promise<AxiosResponse> {
    return await authInst.get(
      `waInstance${creds.idInstance}/qr/${creds.apiTokenInstance}`
    )
  },
  async logout(creds: CredsType): Promise<AxiosResponse> {
    return await authInst.get(
      `waInstance${creds.idInstance}/Logout/${creds.apiTokenInstance}`
    )
  },
}

const messageInst = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'https://api.green-api.com',
})

type notificationBodyType = {
  typeWebhook:
    | 'incomingMessageReceived'
    | 'outgoingMessageReceived'
    | 'outgoingAPIMessageReceived'
  instanceData: {
    idInstance: number
    wid: string
    typeInstance: string
  }
  timestamp: number
  idMessage: string
  senderData: {
    chatId: string
    sender: string
    senderName: string
  }
  messageData: {
    typeMessage: string
    textMessageData: {
      textMessage: string
    }
  }
}

export const messageAPI = {
  async sendMessage(
    creds: CredsType,
    payload: { chatId: string; message: string }
  ): Promise<AxiosResponse<{ idMessage: string }>> {
    return await messageInst.post(
      `waInstance${creds.idInstance}/SendMessage/${creds.apiTokenInstance}`,
      payload
    )
  },

  async getMessage(
    creds: CredsType,
    payload: { chatId: string; idMessage: string }
  ): Promise<AxiosResponse<ChatHistoryObjectType>> {
    return await messageInst.post(
      `waInstance${creds.idInstance}/getMessage/${creds.apiTokenInstance}`,
      payload
    )
  },

  async receiveNotification(
    creds: CredsType
  ): Promise<
    AxiosResponse<{ receiptId: number; body: notificationBodyType }>
  > {
    return await messageInst.get(
      `waInstance${creds.idInstance}/ReceiveNotification/${creds.apiTokenInstance}`
    )
  },

  async deleteNotification(
    creds: CredsType,
    receiptId: number
  ): Promise<AxiosResponse<{ result: boolean }>> {
    return await messageInst.delete(
      `waInstance${creds.idInstance}/DeleteNotification/${creds.apiTokenInstance}/${receiptId}`
    )
  },
}

export type ChatHistoryObjectType = {
  type: 'outgoing' | 'incoming'
  timestamp: number
  idMessage: string
  statusMessage: 'pending' | 'sent' | 'delivered' | 'read' | undefined
  typeMessage: string
  chatId: string
  senderId: string | undefined
  senderName: string | undefined
  textMessage: string
  downloadUrl: string | undefined
  caption: string | undefined
  location: object | undefined
  contact: object | undefined
  extendedTextMessage: {
    text: string
    stanzaId: string
    participant: string
  }
}

export type ChatHistoryType = ChatHistoryObjectType[]

export const journalAPI = {
  async getChatHistory(
    creds: CredsType,
    chatId: string,
    count: number = 100
  ): Promise<AxiosResponse<ChatHistoryType>> {
    return await authInst.post(
      `waInstance${creds.idInstance}/GetChatHistory/${creds.apiTokenInstance}`,
      { chatId, count }
    )
  },
}
