import React, { useState, useEffect } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/cart/fetch'),
      fetch('http://localhost:5000/pets'),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        const cartData = data1.cart_list.map((item) => { return item.pet })
        const cartDataUnique = [...new Set(cartData)];
        const petData = data2.pet_list
        console.log(cartData)
        console.log(cartDataUnique)
        console.log(petData)
      });
      // .then(jsonRes => { console.log(jsonRes.cart_list.map((item) => { return item.pet }).sort())})
  }, [])

  // useEffect(() => {
  //   try {
  //     let [items, contactlist, itemgroup] = await Promise.all([
  //       fetch("http://localhost:3000/items/get"),
  //       fetch("http://localhost:3000/contactlist/get"),
  //       fetch("http://localhost:3000/itemgroup/get")
  //     ]);


  //   }
  //     catch (err) {
  //     console.log(err);
  //   };
  // }, [])




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
