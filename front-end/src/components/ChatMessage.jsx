import jwtDecode from 'jwt-decode';
import moment from 'moment';
import React, { useState } from 'react';
import useInput from '../hooks/useInput';
import socket from '../utils/socketClient';
import fetches from '../services/fetches';

export default function ChatMessage() {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const { email } = jwtDecode(tokenFromLocalStorage);
  const [message, setMessage] = useState('');
  const dateNow = new Date().getTime();
  const sentAt = moment(dateNow).format('H:MM');

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat:sendMessage', { email, sentAt, message });
    fetches.createMessage(tokenFromLocalStorage, email, sentAt, message)
      .then((response) => console.log(response));
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <div>
          <input
            type="text"
            placeholder="Mensagem"
            data-testid="message-input"
            value={ message }
            onChange={ event => setMessage(event.target.value) }
            id="message-input"
          />
          <button
            type="submit"
            data-testid="send-message"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
