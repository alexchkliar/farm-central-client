import React, { useState, useEffect } from "react";
import Order from '../components/Order';

const Orders = ({ user }) => {
  const [userOrders, setUserOrders] = useState([]);


  useEffect(() => {
    fetch(`orders`).then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return
      console.log(jsonRes.order_list)

      setUserOrders(jsonRes.order_list.filter((item) => {
        return (item.buyer === user._id)
      }).reverse()) // reversing so it renders in reverse chronological order
      // .map(function (array) {
      //   return array.food
      // }).filter(foodInCart => foodInCart === food._id).length)


      // setUserOrders(jsonRes.order_list.filter(function (item) {
      //   return item.shopper === user._id
      // }).map(function (array) {
      //   return array.food
      // }).filter(foodInCart => foodInCart === food._id).length)
    })
  }, [user]) // remove dependence?

  return (
    <>
      {userOrders.map((order, index) => (
        <div key={index} >
          <strong>{`Order  ${index + 1}`}</strong>
          <Order id={order._id} items={order.items} date={order.date} />
        </div>
      ))}

      {/* <ul>
        <li><img width="250" height="250" src={food.photo} alt="" /></li>
        <li>{food.name}</li>
        <li>{food.species}</li>
        <li>{food.breed}</li>
        <li>{food.seller}</li>
        <li>${food.price}</li>
        <li>{food.quantity}</li>
        <li>Number in your cart: {activeFoodCount}</li>
      </ul> */}
    </>
  )
}

export default Orders;
