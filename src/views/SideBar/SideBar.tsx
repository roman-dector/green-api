import styles from './SideBar.module.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFillPersonDashFill } from 'react-icons/bs'
import { RxCrossCircled } from 'react-icons/rx'
import { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addChat,
  getChatHistory,
  getChatList,
} from '../../store/ducks/chat/operations'
import {
  selectChatList,
  selectOpenedChat,
} from '../../store/ducks/chat/selectors'
import { setOpenedChat } from '../../store/ducks/chat/actions'
import { ChatListItemType } from '../../store/ducks/chat/reducers'
import { logout } from '../../store/ducks/auth/operations'
import { removeCreds } from '../../store/ducks/app/operations'

export const SideBar: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getChatList())
  })

  return (
    <div className={styles['side-bar']}>
      <Menu />
      <ChatList />
    </div>
  )
}

const ChatList: FC = () => {
  const openedChat = useSelector(selectOpenedChat)
  const chatList = useSelector(selectChatList)

  return (
    <div className={styles['chat-list']}>
      {chatList.map(chat => (
        <ListItem
          key={chat.id}
          chat={chat}
          selected={chat.id === openedChat?.id}
        />
      ))}
    </div>
  )
}

const ListItem: FC<{
  chat: ChatListItemType
  selected: boolean
}> = ({ chat, selected }) => {
  const dispatch = useDispatch()

  return (
    <div
      onClick={() => {
        dispatch(setOpenedChat(chat.id))
        dispatch(getChatHistory(chat))
      }}
      className={
        selected ? styles['list-item-selected'] : styles['list-item']
      }
    >
      {chat.name}
      <br />
      {chat.id
        .split('')
        .slice(0, chat.id.length - 5)
        .join('')}
    </div>
  )
}

const Menu: FC = () => {
  const dispatch = useDispatch()
  const [addChatPopUpVisible, showAddChatPopUp] = useState(false)
  return (
    <div className={styles['menu']}>
      <div className={styles['account']}>
        <div
          onClick={() => {
            dispatch(logout())
          }}
          className={styles['circle']}
        >
          <BsFillPersonDashFill title={'LogOut'} size={30} />
        </div>
        <div
          onClick={() => {
            dispatch(removeCreds())
          }}
          className={styles['circle']}
        >
          <RxCrossCircled
            title={'Change GREEN-API Instance'}
            size={30}
          />
        </div>
      </div>
      <div
        onClick={() => showAddChatPopUp(true)}
        className={styles['add-chat']}
        title={'Add New Chat'}
      >
        <AiOutlinePlus size={30} />
      </div>
      {addChatPopUpVisible ? (
        <AddChatPopUp showPopUp={showAddChatPopUp} />
      ) : null}
    </div>
  )
}

const AccountPopUp: FC = () => {
  return <div></div>
}

const AddChatPopUp: FC<{
  showPopUp: React.Dispatch<React.SetStateAction<boolean>>
}> = props => {
  const dispatch = useDispatch()
  const [chatName, setChatName] = useState<string>('')
  const [chatNumber, setChatNumber] = useState<string>('')

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      addChat({
        id: chatNumber + '@c.us',
        name: chatName,
        unreadCount: 0,
        chatHistory: [],
      })
    )
    setChatName('')
    setChatNumber('')
    props.showPopUp(false)
  }

  let renderNode = (
    <div
      className={styles['add-chat-pop-up-wrapper']}
      onClick={e => {
        if (e.target === e.currentTarget) {
          props.showPopUp(false)
        }
      }}
    >
      <div>
        Введите название чата и номер телефона с кодом страны и без
        пробелов
      </div>
      <form
        className={styles['add-chat-form']}
        onSubmit={onSubmitHandler}
      >
        <div>
          <div>
            <label>Название чата</label>
            <input
              value={chatName}
              onChange={e => setChatName(e.target.value)}
            />
          </div>

          <div>
            <label>Номер телефона</label>
            <input
              value={chatNumber}
              onChange={e => setChatNumber(e.target.value)}
            />
          </div>
        </div>

        <input type={'submit'} value='Создать' />
      </form>
    </div>
  )

  return createPortal(renderNode, document.body)
}
