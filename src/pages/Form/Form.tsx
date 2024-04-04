import './form.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const navigate = useNavigate();

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorLogin = valueLogin.trim().length === 0;
    const errorRoom = valueRoom.trim().length === 0;
    if (errorLogin || errorRoom) {
      return;
    }
    // Сохраняю комнату в localStorage, если ее там нет
    if (!localStorage.getItem(valueRoom)) {
      localStorage.setItem(valueRoom, '');
    }
    // Сохраняю в sessionStorage логин и комнату для получения логина и комнаты в чате
    sessionStorage.clear();
    sessionStorage.setItem(valueLogin, valueRoom);

    navigate(`/chat/:${valueRoom}`);
  };

  const changeHandlerLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueLogin((event.target as HTMLInputElement).value);
  };
  const [valueLogin, setValueLogin] = React.useState('');

  const changeHandlerRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRoom((event.target as HTMLInputElement).value);
  };

  const [valueRoom, setValueRoom] = React.useState('');

  return (
    <div className="wrapper-form">
      <form id="login-form" method="get" onSubmit={handleSubmitForm}>
        <label htmlFor="login">
          <span>Логин</span>
        </label>
        <input
          type="text"
          id="login"
          name="login"
          className="login"
          value={valueLogin}
          onChange={changeHandlerLogin}
          placeholder="Введите логин"
        />
        <label htmlFor="room">
          <span>Номер комнаты</span>
        </label>
        <input
          type="text"
          id="room"
          name="room"
          className="room"
          value={valueRoom}
          onChange={changeHandlerRoom}
          placeholder="Введите номер комнаты"
        />
        <button type="submit" className="form-button">
          НАЧАТЬ ЧАТ
        </button>
      </form>
    </div>
  );
}
