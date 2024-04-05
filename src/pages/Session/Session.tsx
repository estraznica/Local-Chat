import './session.css';
import React from 'react';
import { useMessages } from '../../hooks/use-messages';
import { IMessage } from '../../types';
import { useParams } from 'react-router-dom';
import { useAddImage } from '../../hooks/use-add-image';
import EmojiChatSelect from '../../components/EmojiChatSelect/EmojiChatSelect';
export default function Session() {
  const { id } = useParams();
  const {
    changeMessageHandler,
    handleSubmit,
    handleMessageClick,
    handleMessageReply,
    handleCloseMessageReply,
    setValueMessage,
    setMessagesState,
    setImage,
    messagesState,
    messageReplyValue,
    showMessageReply,
    messageReplyId,
    image,
    valueMessage,
  } = useMessages();

  const { tooBigImage, addImageHandler, handleTooBigImage } = useAddImage(setImage);
  //получаю пользователя и комнату
  const savedUserName = sessionStorage.key(0);
  const savedRoom = id?.slice(1);
  //получаю сообщения
  const messages = messagesState;

  const messagesRef = React.useRef<HTMLDivElement>(null);

  const handleEmojiSelect = (emoji: string) => {
    setValueMessage(valueMessage + emoji);
  };

  React.useEffect(() => {
    //прокручиваю в конец
    let messageArea = messagesRef.current;
    messageArea?.scrollTo({
      top: messageArea?.scrollHeight,
    });
    //изменение сообщений при срабатывании события localStorage
    const storageEventListener = (event: StorageEvent) => {
      if (event.key === savedRoom) {
        const updatedMessagesJSON = localStorage.getItem(String(savedRoom));
        const updatedMessages = updatedMessagesJSON ? JSON.parse(updatedMessagesJSON) : [];
        setMessagesState(updatedMessages);
      }
    };
    window.addEventListener('storage', storageEventListener);
    return () => {
      window.removeEventListener('storage', storageEventListener);
    };
  }, []);

  return (
    <>
      <div className="wrapper-session">
        <header>
          <span className="room-number">Комната #{savedRoom}</span>
          <span className="room-number"> {savedUserName} </span>
        </header>
        <section id="messages" ref={messagesRef} className="messages">
          <>
            {messages.length === 0 ? (
              <div className="no-messages">Здесь пока ничего нет...</div>
            ) : (
              <>
                {messages.map((message: IMessage) => (
                  <div
                    className={message.userName === savedUserName ? 'user-id me' : 'user-id'}
                    key={message.id}
                    onClick={() => handleMessageClick(message.id)}>
                    {message.userName !== savedUserName && message.userName}
                    {typeof message.value === 'string' ? (
                      <div className="message">{message.value}</div>
                    ) : 'src' in message.value ? (
                      <img src={message.value.src} className="message"></img>
                    ) : (
                      <div className="message-reply-wrapp">
                        <div className="message-quote">{message.value.replyValue}</div>
                        <div className="message-reply">{message.value.value}</div>
                      </div>
                    )}
                    {showMessageReply && message.id == messageReplyId && (
                      <div
                        className="replybutton"
                        onClick={() => handleMessageReply(JSON.stringify(message.value))}>
                        Ответить
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </>
        </section>
        <section className="entry-field-wrapp">
          {messageReplyValue && (
            <div className="messagereplyvalue">
              <div className="messagereplyvalue-close" onClick={handleCloseMessageReply}>
                х
              </div>
              <p>{messageReplyValue}</p>
            </div>
          )}
          <div className="entry-field">
            {tooBigImage && (
              <div className="toobigimage">
                <div className="toobigimage-close" onClick={() => handleTooBigImage()}>
                  х
                </div>
                <p>Объем изображения не должен превышать 300KB</p>
              </div>
            )}
            <input
              type="text"
              id="text"
              name="text"
              className="text"
              value={valueMessage}
              onChange={changeMessageHandler}
              placeholder="Написать сообщение..."
            />
            <div className="add-image" onClick={() => addImageHandler()}>
              <img src="../img/clip.svg" alt="add image" className="clip-image" />
              {image && <div className="got-image"></div>}
            </div>
            <EmojiChatSelect onSelectEmoji={handleEmojiSelect} />
            <button className="send" onClick={handleSubmit}>
              <div className="send-triangle"></div>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
