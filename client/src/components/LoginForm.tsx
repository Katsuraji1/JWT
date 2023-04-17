import React, {FC, useState, useContext} from 'react';
import { Context } from './../index';

const LoginForm: FC = () => {

    const {store} = useContext(Context)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return(
        <div>
            <input placeholder='email' type='text' value={email} onChange={e => setEmail(e.target.value)}></input>
            <input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
            <button onClick={() => store.login(email, password)}>Логин</button>
            <button onClick={() => store.registration(email, password)}>Регистрация</button>
        </div>
    )
}

export default LoginForm;