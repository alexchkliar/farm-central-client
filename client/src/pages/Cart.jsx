import React, { useState, useEffect } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cart/fetch").then(res => {
      return res.json()
    }).then((jsonRes) => {
      console.log(jsonRes.cart_list)
    })
  }, [])

  return (
    <div>
      <h1>Header</h1>
      {cartItems.map((pet, index) => (
        <ul key={index}>
          <li><img width="250" height="250" src={pet.photo} alt="" /></li>
          <li>{pet.quantity}</li>
          <button>Remove</button>
        </ul>
      ))}
    </div>
  )
}

export default Cart;
