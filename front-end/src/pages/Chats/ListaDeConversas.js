import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './styleChat.scss';

export default function ListaDeConversas() {
  const [users, setUsers] = useState([]);

  const callAllChats = async () => {
    const allChats = await fetch('http://localhost:4001/chat/messages/numbers');
    const chats = await allChats.json();
    const userList = chats.map((chat) => chat.user);
    // console.log(chats)
    setUsers(userList);
    // const teste = allMsg.filter((el) => el.user !== 'Loja');
    setUsers(chats);
  };

  useEffect(() => {
    callAllChats();
    console.log(new Date());
  }, []);

  return (
    <div>
      <Header title="Chat Loja" user="admin" />
      <div className="listaBoxContainer">
        <h1>Conversas iniciadas</h1>
        <div>
          {users.length === 0
            ? (
              <h3 data-testid="text-for-no-conversation">
                Nenhuma conversa por aqui
              </h3>
            )
            : (
              <div className="containerBox">
                {users && users.map((element, index) => (
                  <div className="containerChat" data-testid="containerChat" key={ index }>
                    <Link className="link" to={ `/admin/chats/${element.user}` }>
                        <p className="profileName" data-testid="profile-name">
                          {element.user}
                        </p>
                      
                      <p className="lastMessage" data-testid="last-message">
                      {
                        `${new Date(Date.parse(element.lastMessage)).getDate()}/
                        ${new Date(Date.parse(element.lastMessage)).getMonth()}/
                        ${new Date(Date.parse(element.lastMessage)).getFullYear()} - 
                        ${new Date(Date.parse(element.lastMessage)).getHours()}:
                        ${new Date(Date.parse(element.lastMessage)).getMinutes()}`
                      }
                        {/* {element.lastMessage} */}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
