import React from 'react';
import { useNavigate } from 'react-router-dom';
export function useLogin() {
  const navigate = useNavigate();
  const handleSubmitForm = (event: React.FormEvent<HTMLButtonElement>) => {
    //проверки на ввод
    if (valueLogin.trim().length === 0) {
      setErrorLogin('true');
      event.preventDefault();
    }
    if (!(valueLogin.trim().length === 0)) {
      setErrorLogin('');
      event.preventDefault();
    }
    if (valueRoom.trim().length === 0) {
      setErrorRoom('true');
      event.preventDefault();
    }
    if (!(valueRoom.trim().length === 0)) {
      setErrorRoom('');
      event.preventDefault();
    }
    if (!(valueLogin.trim().length === 0) && !(valueRoom.trim().length === 0)) {
      //ввод корректный
      setErrorLogin('');
      setErrorLogin('');
      //сохраняю комнату в localStorage, если ее там нет
      if (!localStorage.getItem(valueRoom)) {
        localStorage.setItem(valueRoom, '');
      }
      //сохраняю в sessionStorage логин и комнату для получения логина и комнаты в чате
      sessionStorage.clear();
      sessionStorage.setItem(valueLogin, valueRoom);

      navigate(`/chat/:${valueRoom}`);
      event.preventDefault();
    }
  };

  const [errorLogin, setErrorLogin] = React.useState('');
  const [errorRoom, setErrorRoom] = React.useState('');

  const changeHandlerLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueLogin((event.target as HTMLInputElement).value);
  };
  const [valueLogin, setValueLogin] = React.useState('');

  const changeHandlerRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRoom((event.target as HTMLInputElement).value);
  };
  const [valueRoom, setValueRoom] = React.useState('');

  return {
    valueLogin,
    valueRoom,
    errorLogin,
    errorRoom,
    changeHandlerLogin,
    changeHandlerRoom,
    handleSubmitForm,
  };
}
