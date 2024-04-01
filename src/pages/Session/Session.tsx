import './session.css';
import React from 'react';
import { useSessions } from '../../hooks/sessions';
import { IMessage } from '../../hooks/sessions';
import { useParams } from 'react-router-dom';

export default function Session() {
  const { id } = useParams();
  const {
    changeHandler,
    handleSubmit,
    addImageHandler,
    handleEmojiClick,
    handleTooBigImage,
    showEmoji,
    handleMessageClick,
    handleMessageReply,
    handleCloseMessageReply,
    messageReplyValue,
    showMessageReply,
    messageReplyId,
    showed,
    emojies,
    gotImage,
    valueMessage,
    tooBigImage,
  } = useSessions();
  //получаю пользователя и комнату
  const savedUserName = sessionStorage.key(0);
  const savedRoom = id?.slice(1);
  //получаю сообщения
  const messagesJSON = localStorage.getItem(String(savedRoom));
  const messages = messagesJSON ? JSON.parse(messagesJSON) : [];
  //для перерисовки когда получаю сообщения
  const [state, setState] = React.useState(true);

  React.useEffect(() => {
    //прокручиваю в конец
    let messageArea = document.getElementById('messages');
    messageArea?.scrollTo({
      top: messageArea?.scrollHeight,
    });

    const storageEventListener = (event: StorageEvent) => {
      if (event.key === savedRoom) {
        //обновляю состояние чтобы вызвать перерисовку компонента
        setState((prev) => !prev);
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
          {' '}
          <span className="room-number">Комната #{savedRoom}</span>
          <span className="room-number"> {savedUserName} </span>
        </header>
        <section id="messages" className="messages">
          <>
            {messages.length === 0 ? (
              <div className="no-messages">Здесь пока ничего нет...</div>
            ) : (
              <>
                {messages.map((message: IMessage) => (
                  <div
                    className="user-id"
                    key={message.id}
                    onClick={() => handleMessageClick(message.id)}>
                    {message.userName}
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
              onChange={changeHandler}
              placeholder="Написать сообщение..."
            />
            {showed && (
              <div className="emojies">
                {emojies.map((emojie, i) => (
                  <div className="emoji" key={i} onClick={() => handleEmojiClick(i)}>
                    {emojies[i]}
                  </div>
                ))}
              </div>
            )}
            <div className="add-image">
              <svg
                width="35px"
                height="35px"
                viewBox="0 0 15 15"
                fill="none"
                className="file-img"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.5 7.5L7.74264 13.2574C6.94699 14.053 5.86786 14.5 4.74264 14.5C2.3995 14.5 0.5 12.6005 0.5 10.2574C0.5 9.13214 0.946991 8.05301 1.74264 7.25736L7.67157 1.32843C8.20201 0.797993 8.92143 0.5 9.67157 0.5C11.2337 0.5 12.5 1.76633 12.5 3.32843C12.5 4.07857 12.202 4.79799 11.6716 5.32843L5.91421 11.0858C5.649 11.351 5.28929 11.5 4.91421 11.5C4.13316 11.5 3.5 10.8668 3.5 10.0858C3.5 9.71071 3.649 9.351 3.91421 9.08579L9.5 3.5"
                  stroke="#fff"
                />
              </svg>
              <input type="file" accept="image/*" id="imageInput" onChange={addImageHandler} />
              {gotImage && <div className="got-image"></div>}
            </div>
            <button className="choose-emoji" onClick={showEmoji}>
              🙂
            </button>
            <button className="send" onClick={handleSubmit}>
              <div className="send-triangle"></div>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
