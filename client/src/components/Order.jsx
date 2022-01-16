import React, { useState, useEffect } from "react";
import '../css_components/orders.css';
const moment = require('moment');

const Order = ({ id, date, items, userList }) => {
  const [orderTotal, setOrderTotal] = useState(0);
  // const [sellerNames, setSellerNames] = useState([]);

  useEffect(() => {
    const total = items.map((item) => (
      item.foodPrice * item.itemCartQuantity
    )).reduce((a, b) => a + b, 0)
    setOrderTotal(total);

    // setSellerName(userList.find((element) => {
    //   return element._id === item.foodSeller
    // }).name);

  }, [items, userList]) // remove dependence?

  console.log(items)

  return (
    <div className="" >
      <div>Order ID: {id}</div>
      <div>Placed on {moment(date).format('MMMM DD, YYYY')}</div>
      <br />
      <div className="order-item-list">
        {items.map((item, index) => (
          // <li><img width="250" height="250" src={order.photo} alt="" /></li>
          <div key={index} className="" >
            Item {index + 1}
            <ul>
              <li>{item.foodName}, {item.foodUnits} per bundle </li>
              <li>Location: {item.foodLocation} </li>
              <li>Seller ID: {item.foodSeller} </li>
              <li>Price: ${item.foodPrice.toFixed(2)} </li>
              <li>Quantity: {item.itemCartQuantity} </li>
              <li>Subtotal: ${(item.foodPrice * item.itemCartQuantity).toFixed(2)} </li>
            </ul>
            <br />
          </div>
        ))}
      </div>
      <div><strong>Total ${orderTotal.toFixed(2)}</strong></div>
      <br />
    </div>
  )
}

export default Order;
