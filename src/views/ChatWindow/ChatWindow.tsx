import styles from './ChatWindow.module.css'
import { FC, useEffect, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectChatHistory,
  selectOpenedChat,
} from '../../store/ducks/chat/selectors'
import {
  getForceChatHistory,
  sendMessage,
} from '../../store/ducks/chat/operations'

export const ChatWindow: FC = () => {
  const selectedChat = useSelector(selectOpenedChat)

  if (!selectedChat) {
    return <div className={styles['chat-window']}></div>
  }

  return (
    <div className={styles['chat-window']}>
      <ChatHeader />
      <MessagesFlow />
      <MessageArea />
    </div>
  )
}

const ChatHeader: FC = () => {
  return <div className={styles['header']}></div>
}

const MessagesFlow: FC = () => {
  const chatHistory = useSelector(selectChatHistory)

  useEffect(() => {
    let div = document.querySelector('#messages-flow')
    if (div) {
      div.scrollTop = 1e9
    }
  }, [chatHistory])

  return (
    <div id={'messages-flow'} className={styles['messages-flow']}>
      {chatHistory
        ?.slice()
        .reverse()
        .map(mes => {
          let text =
            mes.typeMessage === 'quotedMessage'
              ? mes.extendedTextMessage.text
              : mes.textMessage

          if (mes.type === 'incoming') {
            return (
              <IncomingMessage
                key={mes.idMessage}
                messageText={text}
              />
            )
          }
          return (
            <OutgoingMessage key={mes.idMessage} messageText={text} />
          )
        })}
    </div>
  )
}

const MessageArea: FC = () => {
  const [message, setMessage] = useState('')
  const selectedChat = useSelector(selectOpenedChat)

  const dispatch = useDispatch()
  const onSubmitHandler = () => {
    if (selectedChat && message) {
      dispatch(sendMessage(selectedChat.id, message))
      setMessage('')
      // setTimeout(() => {
      //   dispatch(getForceChatHistory(selectedChat))
      // }, 2000)
    }
  }
  return (
    <div className={styles['message-area']}>
      <textarea
        onSubmit={onSubmitHandler}
        placeholder={'Введите ваше сообщение'}
        className={styles['message-textarea']}
        onChange={e => setMessage(e.target.value)}
        value={message}
      />
      <button
        onClick={onSubmitHandler}
        className={styles['send-button']}
      >
        <IoMdSend />
      </button>
    </div>
  )
}

const IncomingMessage: FC<{ messageText: string }> = props => {
  return (
    <div className={styles['incoming-mes']}>{props.messageText}</div>
  )
}

const OutgoingMessage: FC<{ messageText: string }> = props => {
  return (
    <div className={styles['outgoing-mes']}>{props.messageText}</div>
  )
}
