import React, { useState, useEffect } from "react";
import Sale from '../components/Sale';
import Accordion from 'react-bootstrap/Accordion'
import '../css_components/sales.css';

const Sales = ({ user, userList }) => {
  const [salesOrders, setSalesOrders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/sold`).then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return
      console.log(jsonRes.sale_list)

      const itemsSoldArray = jsonRes.sale_list.map((item) => {
        let itemSoldByCurrentUserArray = item.items.filter((subItem) => {
          // console.log(subItem)
          // console.log(subItem.foodSeller)
          // console.log(user._id)
          return subItem.foodSeller === user._id
        })
        // console.log(itemSoldByCurrentUserArray)
        // console.log(user)
        return [itemSoldByCurrentUserArray, item.buyer, item.date]
      }).filter((element) => {
        return element[0].length !== 0
      })

      console.log(itemsSoldArray)
      // const itemsSoldArrayMerged = [].concat.apply([], itemsSoldArray);
      // const sellerArray = itemsSoldArrayMerged.filter((element) => {
      //   return element.foodSeller === user._id
      // })
      setSalesOrders(itemsSoldArray.reverse())
      // console.log(salesOrders)
      // .map(function (array) {
      //   return array.food
      // }).filter(foodInCart => foodInCart === food._id).length)


      // setUserOrders(jsonRes.order_list.filter(function (item) {
      //   return item.shopper === user._id
      // }).map(function (array) {
      //   return array.food
      // }).filter(foodInCart => foodInCart === food._id).length)
    })
  }, [user])

  console.log(salesOrders.length === 0)
  if (salesOrders.length !== 0) {
  return (
    <div>
      <h1 className="header-h1">Your sales</h1>
      {salesOrders.map((sale, index) => (
        <div key={index} >
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header><strong>Sale {index + 1}</strong></Accordion.Header>
              <Accordion.Body>

                <Sale items={sale[0]} buyerId={sale[1]} date={sale[2]} userList={userList} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
    </div>
    )
  } else {
    return (
      <>
        <h1 className="header-h1">Your sales</h1>
        <div className="no-sales-container">
        <span>You have no sales yet. </span>
        <a href="/foods/new">List your food now!</a>
        </div>
      </>
    )
  }


}

export default Sales;
