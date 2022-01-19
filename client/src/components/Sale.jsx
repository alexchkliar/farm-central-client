import React, { useState, useEffect } from "react";
import '../css_components/orders.css';

const Sale = ({ buyerId, date, items, userList }) => {
  // // const [buyerName, setBuyerName] = useState();
  const [buyerName, setBuyerName] = useState();

  useEffect(() => {
    setBuyerName(userList.find((element) => {
      return element._id === buyerId
    }).name);
  }, [buyerId, userList]) // remove dependence?

  return (
    <>
      <div>Buyer: {buyerName}</div>
      <div>Placed on {date}</div>
      <br />
      <div className="order-item-list">
        {items.map((item, index) => (
          // <li><img width="250" height="250" src={order.photo} alt="" /></li>
          <div key={index} className="sale-item-div" >
            Item {index + 1}
            <ul>
              <li>{item.foodName}, {item.foodUnits} per bundle </li>
              <li>Price: ${item.foodPrice.toFixed(2)} </li>
              <li>Quantity: {item.itemCartQuantity} </li>
              <li>Subtotal: ${(item.foodPrice * item.itemCartQuantity).toFixed(2)} </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default Sale;
