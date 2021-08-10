import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import socket from './socketClient';
import { verifyUser } from '../../store/LocalStorage/actions';
import Header from '../../components/Header/Header';
import './styleChat.scss';

export default function ChatClient() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [emailUser, setEmail] = useState('');

  socket.on('messages', async ({ from, to, message, time }) => {
    setMessages([...messages, { from, to, message, time }]);
  });

  const history = useHistory();
  const getAllMessages = async (email) => {
    const allMessages = await fetch(`http://localhost:4001/chat/messages/${email}`);
    const allMsg = await allMessages.json();
    setMessages(allMsg);
  };

  useEffect(() => {
    const { email } = verifyUser(history);
    setEmail(email);
    getAllMessages(email);
  }, [history]);
  
  useEffect(() => {
    const scrollBox = document.getElementsByClassName("messageBox")[0];
    scrollBox.scrollTop = scrollBox.scrollHeight;
  }, [messages])

  const newMessage = async () => {
    socket.emit('message', ({
      from: emailUser,
      to: 'tryber@trybe.com.br',
      message: inputValue,
    }));
    
    const myMessage = messages;
    console.log(myMessage);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    newMessage();
    setInputValue('');
  };

  const handleChangeMessage = (value) => {
    setInputValue(value);
  };

  return (
    <div className="boxContainer">
      <Header title="Chat com a Loja" user="client" />
      {/* <h1>Chat Client</h1> */}
      <div className="messageBox">
        <ul>
          {messages && messages.map((msg, index) => (
            <li key={ index } className={(msg.from === emailUser) ? "userMessage" : "adminMessage"}>
              <p className="nickname" data-testid="nickname">
                {(msg.from !== emailUser) ? "Loja" : msg.from }
              </p>
              <p className="message-time" data-testid="message-time">
              {
                `${new Date(Date.parse(msg.time)).getDate()}/
                ${new Date(Date.parse(msg.time)).getMonth()}/
                ${new Date(Date.parse(msg.time)).getFullYear()} - 
                ${new Date(Date.parse(msg.time)).getHours()}:
                ${new Date(Date.parse(msg.time)).getMinutes()}`
              }
                {/* {msg.time} */}
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
