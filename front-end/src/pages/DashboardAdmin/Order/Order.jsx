import React, { useEffect, useState } from 'react';
import { getSales } from '../../../services/Sales';
import Header from '../../../components/Header/Header';
import AdminOrderCard from '../../../components/AdminOrderCard/AdminOrderCard';
import './Order.scss';

export default function Orders() {
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    const allSales = await getSales();
    setSales(allSales);
  };

  useEffect(() => {
    fetchSales();
  }, [sales]);

  return (
    <div>
      <Header title="TryBeer" user="admin" />
        <div className="cardContainer">
        {(sales.length && sales.map((sale, index) => (
          <AdminOrderCard
            className="orderCard"
            sale={ sale }
            key={ sale.id }
            index={ index }
          />
        )))
        || (<span>Você não possui nenhum pedido :(</span>)}
      </div>
    </div>
  );
}
