import React, { useState } from 'react';

export interface IMessage {
  id: number;
  value: string | IMessageObj;
  userName: string;
}
interface IMessageObj {
  src?: string;
  value: string;
  replyValue: string;
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
  //если загрузили слишком большое изображение
  const handleTooBigImage = () => {
    setTooBigImage((prev) => !prev);
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
  //цитирование
  const [messageReply, setMessageReply] = React.useState('');
  const [messageReplyValue, setMessageReplyValue] = React.useState('');
  const [showMessageReply, setShowMessageReply] = React.useState({});
  const [messageReplyId, setMessageReplyId] = React.useState(0);
  const handleMessageClick = function (id: number) {
    setShowMessageReply((prev) => !prev);
    setMessageReplyId(id);
  };
  const handleMessageReply = function (value: string) {
    let message = JSON.parse(value);
    //простая цитата
    if (typeof message == 'string') {
      setMessageReply(value);
      setMessageReplyValue(value.slice(0, 100));
    } else if ('src' in message) {
      //цитирование изображения
      setMessageReply('Изображение');
      setMessageReplyValue('Изображение');
    } else {
      //цитирование цитаты
      setMessageReply(message.value);
      setMessageReplyValue(message.value.slice(0, 100));
    }
  };
  const handleCloseMessageReply = () => {
    setMessageReply('');
    setMessageReplyValue('');
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
      //если цитирование
      if (messageReply) {
        const newMessage = {
          id: Date.now(),
          value: {
            value: valueMessage,
            replyValue: messageReply,
          },
          userName: savedUserName,
        };
        saveMessages.push(newMessage);
        localStorage.setItem(savedRoom, JSON.stringify(saveMessages));
        setMessageReply('');
        setMessageReplyValue('');
      } else {
        //если просто сообщение
        const newMessage = { id: Date.now() + 1, userName: savedUserName, value: valueMessage };
        saveMessages.push(newMessage);
        localStorage.setItem(savedRoom, JSON.stringify(saveMessages));
      }
    }
    setValueMessage('');
    event.preventDefault();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueMessage((event.target as HTMLInputElement).value);
  };
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
    handleMessageClick,
    handleMessageReply,
    handleCloseMessageReply,
    messageReplyValue,
    messageReplyId,
    showMessageReply,
    emojies,
    gotImage,
    tooBigImage,
    valueMessage,
    showed,
  };
}
