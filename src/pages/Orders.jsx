import React, { useState, useEffect } from "react";
import Order from '../components/Order';
import Accordion from 'react-bootstrap/Accordion'

const Orders = ({ user }) => {
  const [userOrders, setUserOrders] = useState([]);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/orders`).then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return
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

  if (userOrders.length !== 0) {
    return (
      <>
        <h1 className="header-h1">Your orders</h1>
        {userOrders.map((order, index) => (
          <div key={index} >

            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header><strong>{`Order  ${index + 1}`}</strong></Accordion.Header>
                <Accordion.Body>

                  <Order id={order._id} items={order.items} date={order.date} />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}

      </>
    )
  } else {
    return (
      <>
        <h1 className="header-h1">Your orders</h1>
        <div className="no-sales-container">
          <span>You have no orders yet. </span>
          <a href="/foods">Browse fresh local food now!</a>
        </div>
      </>
    )
  }
}

export default Orders;
