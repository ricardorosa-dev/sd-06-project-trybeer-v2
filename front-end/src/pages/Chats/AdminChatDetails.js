import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import socket from './socketClient';
import { verifyUser } from '../../store/LocalStorage/actions';
import Header from '../../components/Header/Header';
import './styleChat.scss';

export default function DetailChat() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [email, setEmail] = useState('');

  const { client } = useParams();

  socket.on('messages', async ({ from, to, message, time }) => {
    setMessages([...messages, { from, to, message, time }]);
  });

  const history = useHistory();

  useEffect(() => {
    const { email } = verifyUser(history);
    console.log(email);
    setEmail(email);
    const getAllMessages = async () => {
      const allMessages = await fetch(`http://localhost:4001/chat/messages/${client}`);
      const allMsg = await allMessages.json();
      setMessages(allMsg);
    };
    getAllMessages(email);
  }, [history, client]);
  
  useEffect(() => {
    const scrollBox = document.getElementsByClassName("messageBox")[0];
    scrollBox.scrollTop = scrollBox.scrollHeight;
  }, [messages])

  const newMessage = async () => {
    socket.emit('message', ({
      from: 'tryber@trybe.com.br',
      to: client,
      message: inputValue,
    }));
    
    // isso, por algum motivo, faz o messages atualizar
    // o que faz com que o componente renderize novamente, sem precisar do useEffect
    const myMessages = messages;
    console.log(myMessages);
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
      <Header title={`Chat com ${client}` } user="admin" />
      {/* <h1>Chat com </h1> */}
      <div className="messageBox">
        <ul>
          {messages && messages.map((msg, index) => (
            <li key={ index } className={(msg.from !== 'tryber@trybe.com.br') ? "adminMessage" : "userMessage"}>
              <p data-testid="nickname">
                {msg.from}
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
