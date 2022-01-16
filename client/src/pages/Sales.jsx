import React, { useState, useEffect } from "react";
import Sale from '../components/Sale';

const Sales = ({ user, userList }) => {
  const [salesOrders, setSalesOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/sold/").then(res => {
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

  return (
    <div>
      {salesOrders.map((sale, index) => (
        <div key={index} >
          <strong>Sale {index + 1}</strong>
          <Sale items={sale[0]} buyerId={sale[1]} date={sale[2]} userList={userList} />
          <br />
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
    </div>
  )
}

export default Sales;
