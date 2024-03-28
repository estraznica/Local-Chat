import React, { useState } from 'react';

export interface IMessage {
  id: number;
  value: string;
  userName: string;
}

export function useSessions() {
  //получаю пользователя и комнату из sessionStorage
  const savedUserName = String(sessionStorage.key(0));
  const savedRoom = String(sessionStorage.getItem(String(savedUserName)));
  //получаю сообщения из localStorage
  const messagesJSON = localStorage.getItem(String(savedRoom));
  //парсю их, если они есть
  const saveMessages = messagesJSON ? JSON.parse(messagesJSON) : [];

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    if (valueMessage.trim().length === 0) {
      event.preventDefault();
    } else {
      //сохраняем сообщение в localStorage при отправке
      const newMessage = { id: Date.now(), userName: savedUserName, value: valueMessage };
      saveMessages.push(newMessage);
      localStorage.setItem(savedRoom, JSON.stringify(saveMessages));
      setMessages([...messages, newMessage]);
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
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [valueMessage, setValueMessage] = useState('');

  return { changeHandler, handleSubmit, setValueMessage, valueMessage, messages, error };
}
