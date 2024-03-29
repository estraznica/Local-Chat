import React, { useState } from 'react';

export interface IMessage {
  id: number;
  value: string | IMessageImg;
  userName: string;
}
interface IMessageImg {
  src: string;
}
export function useSessions() {
  //получаю пользователя и комнату из sessionStorage
  const savedUserName = String(sessionStorage.key(0));
  const savedRoom = String(sessionStorage.getItem(String(savedUserName)));
  //получаю сообщения из localStorage
  const messagesJSON = localStorage.getItem(String(savedRoom));
  //парсю их, если они есть
  const saveMessages = messagesJSON ? JSON.parse(messagesJSON) : [];

  //поддержка медиа-контента
  const [gotImage, setGotImage] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [tooBigImage, setTooBigImage] = React.useState(false);

  const addImageHandler = function () {
    const input = document.getElementById('imageInput') as HTMLInputElement;
    const file = input.files ? input.files[0] : null;
    if (file) {
      const maxSizeInBytes = 300 * 1024; // 300KB, ограничение для размера изображения, чтобы быстро не переполнить localStorage
      if (file.size <= maxSizeInBytes) {
        const reader = new FileReader();
        reader.onload = function (event: ProgressEvent<FileReader>) {
          const imageData = event.target?.result;
          setImage(String(imageData));
          setGotImage(true);
          setTooBigImage(false);
        };
        reader.readAsDataURL(file);
      } else {
        setTooBigImage(true);
      }
    }
  };
  //добавление эмоджи в текст
  const [showed, setShowed] = React.useState(false);
  const showEmoji = function () {
    setShowed((prev) => !prev);
  };

  let emojies = ['😀', '😆', '😅', '🤣', '🙂', '🙃', '🥰'];
  const handleEmojiClick = function (i: number) {
    setValueMessage(valueMessage + emojies[i]);
  };
  //если загрузили слишком большое изображение
  const handleTooBigImage = () => {
    setTooBigImage((prev) => !prev);
  };

  //отправка сообщения
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    //если добавили изображение
    if (image) {
      const newMessage = {
        id: Date.now(),
        userName: savedUserName,
        value: { src: image },
      };
      saveMessages.push(newMessage);
      localStorage.setItem(savedRoom, JSON.stringify(saveMessages));
      setGotImage(false);
      setImage('');
    }
    if (valueMessage.trim().length === 0) {
      event.preventDefault();
    } else {
      //сохраняем сообщение в localStorage при отправке
      const newMessage = { id: Date.now() + 1, userName: savedUserName, value: valueMessage };
      saveMessages.push(newMessage);
      localStorage.setItem(savedRoom, JSON.stringify(saveMessages));
    }
    if (localStorage.getItem(String(savedUserName)) !== savedRoom) {
      setError('Вы не являетесь участником чата');
    }
    setValueMessage('');
    event.preventDefault();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueMessage((event.target as HTMLInputElement).value);
  };
  const [error, setError] = useState('');
  const [valueMessage, setValueMessage] = useState('');

  return {
    changeHandler,
    handleSubmit,
    setValueMessage,
    addImageHandler,
    setTooBigImage,
    handleEmojiClick,
    handleTooBigImage,
    showEmoji,
    emojies,
    gotImage,
    tooBigImage,
    valueMessage,
    showed,
    error,
  };
}
