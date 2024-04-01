import './form.css';
import React from 'react';
import { useForms } from '../../hooks/forms';

export default function Form() {
  const {
    valueLogin,
    valueRoom,
    changeHandlerLogin,
    changeHandlerRoom,
    handleSubmitForm,
    errorRoom,
    errorLogin,
  } = useForms();

  return (
    <div className="wrapper-form">
      <form id="login-form" method="get" action={`/chat/:${valueRoom}`}>
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
        {errorLogin && <p className="error-form">Пожалуйста, введите логин</p>}
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
        {errorRoom && <p className="error-form">Пожалуйста, введите номер комнаты</p>}
        <button type="submit" className="form-button" onClick={handleSubmitForm}>
          НАЧАТЬ ЧАТ
        </button>
      </form>
    </div>
  );
}
