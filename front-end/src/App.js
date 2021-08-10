import React from 'react';
import './App.scss';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {
  Login,
  Register,
  Products,
  AdminOrdersDetail,
  AdminProfile,
  AdminOrders,
  Checkout,
  OrderDetails,
  ClientProfile,
  ClientOrders,
  ListaDeConversas,
  ChatClient,
  DetailChat,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/profile" component={ ClientProfile } />
        <Route path="/products" component={ Products } />
        <Route path="/checkout" component={ Checkout } />
        <Route exact path="/orders/:id" component={ OrderDetails } />
        <Route exact path="/orders" component={ ClientOrders } />
        <Route exact path="/admin/profile" component={ AdminProfile } />
        <Route exact path="/admin/orders/:id" component={ AdminOrdersDetail } />
        <Route exact path="/admin/orders" component={ AdminOrders } />
        <Route exact path="/chat" component={ ChatClient } />
        <Route exact path="/admin/chats" component={ ListaDeConversas } />
        <Route exact path="/admin/chats/:client" component={ DetailChat } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
