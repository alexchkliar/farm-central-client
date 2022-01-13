import React, { useState, useEffect } from "react";
import Sale from '../components/Sale';

const Sales = ({ user }) => {
  const [salesOrders, setSalesOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/sold/").then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return
      console.log(jsonRes.sale_list)

      const itemsSoldArray = jsonRes.sale_list.map((item) => {
        let itemSoldByCurrentUserArray = item.items.filter((subItem) => {
          return subItem.petSeller === user._id
        })
        return [itemSoldByCurrentUserArray, item.buyer, item.date]
      })

      console.log(itemsSoldArray)
      // const itemsSoldArrayMerged = [].concat.apply([], itemsSoldArray);
      // const sellerArray = itemsSoldArrayMerged.filter((element) => {
      //   return element.petSeller === user._id
      // })
      setSalesOrders(itemsSoldArray)
      console.log(salesOrders)
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
      {salesOrders.map((sale, index) => (
        <Sale key={index} items={sale[0]} buyerId={sale[1]} date={sale[2]} />
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

export default Sales;
