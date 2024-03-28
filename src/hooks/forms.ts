import React, { useState } from 'react';

export function useForms() {
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

      window.open(`/chat/:${valueRoom}`, '_blank');
      event.preventDefault();
    }
  };

  const [errorLogin, setErrorLogin] = useState('');
  const [errorRoom, setErrorRoom] = useState('');

  const changeHandlerLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueLogin((event.target as HTMLInputElement).value);
  };
  const [valueLogin, setValueLogin] = useState('');

  const changeHandlerRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRoom((event.target as HTMLInputElement).value);
  };
  const [valueRoom, setValueRoom] = useState('');

  return {
    valueLogin,
    valueRoom,
    changeHandlerLogin,
    changeHandlerRoom,
    handleSubmitForm,
    errorLogin,
    errorRoom,
  };
}
// import React, { useState } from 'react';

// export function useForms() {
//   const handleSubmitForm = (event: React.FormEvent<HTMLButtonElement>) => {
//     if (valueLogin.trim().length === 0) {
//       setErrorLogin('true');
//       event.preventDefault();
//     }
//     if (!(valueLogin.trim().length === 0)) {
//       setErrorLogin('');
//       event.preventDefault();
//     }
//     if (valueRoom.trim().length === 0) {
//       setErrorRoom('true');
//       event.preventDefault();
//     }
//     if (!(valueRoom.trim().length === 0)) {
//       setErrorRoom('');
//       event.preventDefault();
//     }
//     if (!(valueLogin.trim().length === 0) && !(valueRoom.trim().length === 0)) {
//       setErrorLogin('');
//       setErrorLogin('');

//       sessionStorage.clear();
//       sessionStorage.setItem(valueLogin, valueRoom);

//       window.open(`/chat/:${valueRoom}`, '_blank');
//       event.preventDefault();
//     }
//   };

//   const [errorLogin, setErrorLogin] = useState('');
//   const [errorRoom, setErrorRoom] = useState('');

//   const changeHandlerLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValueLogin((event.target as HTMLInputElement).value);
//   };
//   const [valueLogin, setValueLogin] = useState('');

//   const changeHandlerRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValueRoom((event.target as HTMLInputElement).value);
//   };
//   const [valueRoom, setValueRoom] = useState('');

//   return {
//     valueLogin,
//     valueRoom,
//     changeHandlerLogin,
//     changeHandlerRoom,
//     handleSubmitForm,
//     errorLogin,
//     errorRoom,
//   };
// }
