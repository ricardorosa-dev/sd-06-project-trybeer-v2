import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../axios';
import socket from './socket';

const ChatMenu = () => {
  const [loading, setLoading] = useState(false);
  const [inboxes, setInboxes] = useState([]);
  const empty = <p data-test="text-for-no-conversation">Nenhuma conversa por aqui</p>;

  useEffect(() => {
    setLoading(true);
    api.get('/conversations').then((response) => {
      const { data: { conversations } } = response;
      setInboxes(conversations);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    socket.on('server-to-admin', () => {
      api.get('/conversations').then((response) => {
        const { data: { conversations } } = response;
        setInboxes(conversations);
      });
    });
  });

  const renderConversations = () => {
    const chats = inboxes.map((inbox, index) => (
      <Link to="/admin/chat" key={ `conversation-${index}` }>
        <div data-testid="containerChat">
          <p data-testid="profile-name">{ inbox.email }</p>
          <p data-testid="last-message">
            { `Última mensagem às ${inbox.messages[inbox.messages.length - 1].time}` }
          </p>
        </div>
      </Link>
    ));

    return chats;
  };

  return (
    <div>
      { (!loading && inboxes.length) ? renderConversations() : empty }
    </div>
  );
};

export default ChatMenu;
