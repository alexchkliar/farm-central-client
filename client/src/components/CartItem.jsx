import React, { useState } from "react";
import Axios from 'axios';

const CartItem = ({ url, id, quantityInCart, quantityAvailable, seller, breed, species, price, name, food, user, setCartNum, setTotalPrice, setCartRefreshTrigger }) => {
  const [itemQuantity, setItemQuantity] = useState(quantityInCart);

  // useEffect(() => {
  //   fetch("http://localhost:5000/cart/fetch").then(res => {
  //     return res.json()
  //   }).then((jsonRes) => {
  //     if (user === null) return
  //     setActiveFoodCount(jsonRes.cart_list.filter(function (item) {
  //       return item.shopper === user._id
  //     }).map(function (array) {
  //       return array.food
  //     }).filter(foodInCart => foodInCart === food._id).length)
  //   })
  // }, []) // remove user dependence?


  function add(e) {
    // console.log(cartItems)
    console.log(e.target.value)
    console.log("add")
    console.log(food)
    if (itemQuantity < quantityAvailable) {
      Axios({
        method: "POST",
        data: {
          food: food,
          shopper: user
        },
        withCredentials: true,
        url: "http://localhost:5000/cart/add"
      }).then((res) => {
        setItemQuantity(currentItemQuantity => currentItemQuantity + 1)
        setCartNum(currentCartNum => currentCartNum + 1)
        setTotalPrice(currentTotalPrice => currentTotalPrice + price)
        setCartRefreshTrigger(x => x + 1)
        console.log(res.data);
      }).catch(err => {
        console.log(err)
      })
    }
  }

  function remove(e) {
    console.log(e.target.value)
    console.log("remove")
    console.log(food)
    if (itemQuantity >= 1) {
      Axios({
        method: "DELETE",
        data: {
          food: food,
          shopper: user
        },
        withCredentials: true,
        url: "http://localhost:5000/cart/remove"
      }).then((res) => {
        setItemQuantity(currentItemQuantity => currentItemQuantity -1)
        setCartNum(currentCartNum => currentCartNum - 1)
        setTotalPrice(currentTotalPrice => currentTotalPrice - price)
        setCartRefreshTrigger(x => x + 1)
        console.log(res.data);
      }).catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <div className="abc">
      <ul>
        <li>Photo URL: {url}</li>
        <li>Food ID: {id}</li>
        <li>Name: {name}</li>
        <li>Breed: {breed}</li>
        <li>Species: {species}</li>
        <li>Price: {price}</li>
        <li>Quantity in cart: {itemQuantity}</li>
        <li>Quantity available: {quantityAvailable}</li>
        <li>Seller: {seller}</li>
        <li>Subtotal: {price * itemQuantity}</li>
        <button onClick={(e) => add(e)} value="test" >Add</button>
        <button onClick={(e) => remove(e)} value="test" >Remove</button>
      </ul>
    </div>
  )
}

export default CartItem;
