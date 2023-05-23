import styles from './AskCredsPage.module.css'
import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveCreds } from '../../store/ducks/app/operations'

export const AskCredsPage: FC = () => {
  const dispatch = useDispatch()
  const [idInstance, setIdInstance] = useState<number>()
  const [apiTokenInstance, setApiTokenInstance] = useState<string>()

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (idInstance && apiTokenInstance) {
      dispatch(saveCreds(idInstance, apiTokenInstance))
    }
  }

  return (
    <div className={styles['ask-creds-page']}>
      <div className={styles['title']}>
        Введите свои учетные данные из системы GREEN-API
      </div>
      <form
        className={styles['ask-creds-form']}
        onSubmit={onSubmitHandler}
        name='creds'
      >
        <div>
          <div>
            <label>Id Instance</label>
            <input
              name='idInstance'
              value={idInstance}
              onChange={e => setIdInstance(+e.target.value)}
            />
          </div>
          <div>
            <label>Api Token Instance</label>
            <input
              name='apiTokenInstance'
              value={apiTokenInstance}
              onChange={e => setApiTokenInstance(e.target.value)}
            />
          </div>
        </div>
        <input type={'submit'} value={'Сохранить'} />
      </form>
    </div>
  )
}
