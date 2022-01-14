import React, { useState, useEffect } from "react";

const Sale = ({ buyerId, date, items }) => {
  // // const [buyerName, setBuyerName] = useState();

  // useEffect(() => {
  //   const requestOptions = {
  //     method: 'POST',
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Credentials": true,
  //     },
  //     credentials: "include",
  //     // body: { buyerId: buyerId }
  //   }
  //   fetch("http://localhost:5000/auth/user_name", requestOptions).then(res => {
  //     return res
  //   }).then((jsonRes) => {
  //     console.log(jsonRes)
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }, [buyerId]) // remove dependence?

  return (
    <div className="" >
      Test
      <li>Buyer: {buyerId}, placed on {date}</li>
      {items.map((item, index) => (
        // <li><img width="250" height="250" src={order.photo} alt="" /></li>
        <div key={index} className="" >
          Item {index + 1}
          <ul>
            <li>Name: {item.petName} </li>
            <li>Price: {item.petPrice} </li>
            <li>Quantity: {item.itemCartQuantity} </li>
            <li>Subtotal: ${item.petPrice * item.itemCartQuantity} </li>
          </ul>
        </div>
      ))}

    </div>
  )
}

export default Sale;
