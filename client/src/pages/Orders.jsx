import React, { useState, useEffect } from "react";
import Order from '../components/Order';

const Orders = ({ user }) => {
  const [userOrders, setUserOrders] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5000/orders/").then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return
      console.log(jsonRes.order_list)

      setUserOrders(jsonRes.order_list.filter((item) => {
        return (item.buyer === user._id)
      }).reverse()) // reversing so it renders in reverse chronological order
      // .map(function (array) {
      //   return array.pet
      // }).filter(petInCart => petInCart === pet._id).length)


      // setUserOrders(jsonRes.order_list.filter(function (item) {
      //   return item.shopper === user._id
      // }).map(function (array) {
      //   return array.pet
      // }).filter(petInCart => petInCart === pet._id).length)
    })
  }, [user]) // remove dependence?

  return (
    <div>
      {userOrders.map((order, index) => (
        <Order key={order._id} id={order._id} items={order.items} date={order.date} />
      ))}

      {/* <ul>
        <li><img width="250" height="250" src={pet.photo} alt="" /></li>
        <li>{pet.name}</li>
        <li>{pet.species}</li>
        <li>{pet.breed}</li>
        <li>{pet.seller}</li>
        <li>${pet.price}</li>
        <li>{pet.quantity}</li>
        <li>Number in your cart: {activePetCount}</li>
      </ul> */}
    </div>
  )
}

export default Orders;
