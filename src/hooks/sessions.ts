import React from 'react';
import { IMessage } from '../types';

export function useSessions() {
  //получаю пользователя и комнату из sessionStorage
  const savedUserName = String(sessionStorage.key(0));
  const savedRoom = String(sessionStorage.getItem(String(savedUserName)));
  //получаю сообщения из localStorage
  const messagesJSON = localStorage.getItem(String(savedRoom));
  //парсю их, если они есть
  const savedMessages = messagesJSON ? JSON.parse(messagesJSON) : [];
  //храню сообщения в состоянии
  const [messagesState, setMessagesState] = React.useState(savedMessages);

  //поддержка медиа-контента
  const [gotImage, setGotImage] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [tooBigImage, setTooBigImage] = React.useState(false);

  const addImageHandler = function (imageInputRef: React.RefObject<HTMLInputElement>) {
    const input = imageInputRef.current;
    const file = input?.files ? input.files[0] : null;
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
      const newMessage: IMessage = {
        id: Date.now(),
        value: { src: image },
        userName: savedUserName,
      };
      savedMessages.push(newMessage);
      localStorage.setItem(savedRoom, JSON.stringify(savedMessages));
      setMessagesState(savedMessages);
      setGotImage(false);
      setImage('');
    }
    if (valueMessage.trim().length === 0) {
      event.preventDefault();
    } else {
      //если цитирование
      if (messageReply) {
        const newMessage: IMessage = {
          id: Date.now(),
          value: {
            value: valueMessage,
            replyValue: messageReply,
          },
          userName: savedUserName,
        };
        savedMessages.push(newMessage);
        localStorage.setItem(savedRoom, JSON.stringify(savedMessages));
        setMessagesState(savedMessages);
        setMessageReply('');
        setMessageReplyValue('');
      } else {
        //если просто сообщение
        const newMessage: IMessage = {
          id: Date.now() + 1,
          userName: savedUserName,
          value: valueMessage,
        };
        savedMessages.push(newMessage);
        localStorage.setItem(savedRoom, JSON.stringify(savedMessages));
        setMessagesState(savedMessages);
      }
    }
    setValueMessage('');
    event.preventDefault();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueMessage((event.target as HTMLInputElement).value);
  };
  const [valueMessage, setValueMessage] = React.useState('');

  return {
    changeHandler,
    handleSubmit,
    setValueMessage,
    addImageHandler,
    setTooBigImage,
    handleTooBigImage,
    handleMessageClick,
    handleMessageReply,
    handleCloseMessageReply,
    setMessagesState,
    messagesState,
    messageReplyValue,
    messageReplyId,
    showMessageReply,
    gotImage,
    tooBigImage,
    valueMessage,
  };
}
