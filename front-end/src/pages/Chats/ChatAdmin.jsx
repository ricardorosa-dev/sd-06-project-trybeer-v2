import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import socket from './socketClient';
import { verifyUser } from '../../store/LocalStorage/actions';
import './styleChat.scss';

export default function ChatAdmin() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  // const [att, setAtt] = useState(0);
  const [emailUser] = useState('zebirita@gmail.com');

  const history = useHistory();
  const getAllMessages = async (email) => {
    const allMessages = await fetch(`http://localhost:4001/chat/userMessages/${email}`);
    const allMsg = await allMessages.json();
    setMessages(allMsg);
  };

  socket.on('messages', async ({ Loja, time, message, user }) => {
    // console.log(userBack, time, msg, Loja);
    setMessages([...messages, { Loja, time, message, user }]);
  });

  useEffect(() => {
    verifyUser(history);
    // setEmail('zebirita@gmail.com');
    getAllMessages(emailUser);
  }, [history, emailUser]);

  const newMessage = async () => {
    // const hora = new Date().toLocaleTimeString().split(':');
    // const time = `${hora[0]}:${hora[1]}`;
    console.log(emailUser, inputValue);
    socket.emit('message', ({
      user: 'Loja',
      message: inputValue,
      Loja: emailUser,
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    newMessage();
    setInputValue('');
    // getAllMessages(emailUser);
    // setAtt(att + 12);
    // socket.emit('clientMsg');
  };

  const handleChangeMessage = (value) => {
    setInputValue(value);
  };

  return (
    <div className="boxContainer">
      <h1>Chat Client</h1>
      <div className="messageBox">
        <ul>
          {messages && messages.map((msg, index) => (
            <li key={ index } className={(msg.from === emailUser) ? "userMessage" : "adminMessage"}>
              <p data-testid="nickname">
                {msg.user}
              </p>
              <p data-testid="message-time">
                {msg.time}
              </p>
              <p data-testid="text-message">
                {msg.message}
              </p>
            </li>
          ))}
        </ul>
      </div>
      
      <form>
        <input
          type="text"
          data-testid="message-input"
          value={ inputValue }
          onChange={ ({ target }) => handleChangeMessage(target.value) }
        />
        <button
          type="submit"
          data-testid="send-message"
          onClick={ (e) => handleSendMessage(e) }
        >
          Send
        </button>
      </form>
    </div>
  );
}
