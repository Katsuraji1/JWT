import React, {FC, useEffect, useContext, useState} from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import UserService from './services/UserService';
import { IUser } from './models/IUser';


const App: FC = () => {

  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  const getUsers = async () => {
    const response = await UserService.getUsers()
    setUsers(response.data)
  }
  
  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if(store.isLoading) {
    return <div>Загрузка</div>
  }

  if(!store.isAuth) {
    return (
      <div>
        <LoginForm/>
      </div>
    )
  }

  return(
    <div>
      <h1>{store.isAuth ? `${store.user.email}` : 'Авторизуйтесь'}</h1>
      <h1>{store.user.isActivated ? `Аккаунт подтвержден` : `Аккаунт не подтвержден`}</h1>
      <button onClick={() => store.logout()}>Выход</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
      {users.map(user =>
          <div key={user.email}>{user.email}</div>
        )}
    </div>
  )
}

export default observer(App);
