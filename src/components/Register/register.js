import React, { useState } from 'react';
import axios from "axios";
import styles from './register.module.css'

const AuthPage = ({userID, setPassword, password, username, setUsername, setIsLogged, users, setUsers }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [error, setError] = useState('');


    const handlePasswordChange = (password) => {
        setPassword(password);
        if (password.length >= 6) {
            setPasswordsMatch(isLogin ? true : password === confirmPassword);
        }
    };

    const handleConfirmPasswordChange = (confirmPassword) => {
        setConfirmPassword(confirmPassword);
        if (password.length >= 6) {
            setPasswordsMatch(password === confirmPassword);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isLogin) {
            axios.get(`https://656d9753bcc5618d3c237d07.mockapi.io/user?name=${username}&password=${password}`)
                .then(response => {
                    if (response.data.length > 0) {

                        localStorage.setItem('userData', JSON.stringify({ username, password, userID }));
                        setIsLogged(true);
                        console.log('Успешный вход:', { username, password, userID });
                    } else {
                        console.log('Неправильное имя пользователя или пароль');
                    }
                })
                .catch(error => {
                    console.error('Ошибка при попытке входа:', error);
                });
        } else {
            if (password.length >= 6 && password === confirmPassword) {
                if (users.some(user => user.name === username)) {
                    setError('Данное имя пользователя занято');
                } else {
                    axios.post("https://656d9753bcc5618d3c237d07.mockapi.io/user", {
                        name: username,
                        password: password,
                        array: ['']
                    })
                        .then(response => {
                            const userID = response.data.id;
                            localStorage.setItem('userData', JSON.stringify({ username, password, userID }));
                            setIsLogged(true);
                            console.log('Данные для регистрации:', { username, password, userID });
                        })
                        .catch(error => {
                            console.error('Ошибка при отправке данных:', error);
                        });
                }
            } else {
                setPasswordsMatch(false);
            }
        }
    };

    const toggleLogin = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className={styles.authForm}>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Логин:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Пароль:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                    </label>
                </div>
                {!isLogin && (
                    <div>
                        <label>
                            Подтвердите пароль:
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                            />
                        </label>
                    </div>
                )}
                {!passwordsMatch && <p style={{ color: 'red' }}>Пароли не совпадают или короче 6 символов.</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
            </form>
            <p>
                {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
                <button onClick={toggleLogin}>
                    {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </button>
            </p>
        </div>
    );
};

export default AuthPage;
