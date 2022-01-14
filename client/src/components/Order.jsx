import React, { useState, useEffect } from "react";

const Order = ({ id, date, items }) => {
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const total = items.map((item) => (
      item.foodPrice * item.itemCartQuantity
    )).reduce((a, b) => a + b, 0)
    setOrderTotal(total);
  }, [items]) // remove dependence?

  return (
    <div className="" >
    Order ID: {id}, placed on {date}, total ${orderTotal}
      {items.map((item, index) => (
      // <li><img width="250" height="250" src={order.photo} alt="" /></li>
        <div key={index} className="" >
          Item {index + 1}
          <ul>
            <li>Name: {item.foodName} </li>
            <li>Species: {item.foodSpecies} </li>
            <li>Price: {item.foodPrice} </li>
            <li>Quantity: {item.itemCartQuantity} </li>
            <li>Subtotal: ${item.foodPrice * item.itemCartQuantity} </li>
          </ul>
        </div>
      ))}

    </div>
  )
}

export default Order;
