import React, { useState } from "react";
import Axios from 'axios';
import '../css_components/cartitem.css';

const CartItem = ({ url, id, quantityInCart, quantityAvailable, seller, units, category, price, name, food, user, location, setCartNum, setTotalPrice, setCartRefreshTrigger }) => {
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
    <div className="cart-item-container">
      <div className="cart-divider-1">
        <img className="cart-img" src={url} alt="" />
      </div>
      <div className="cart-divider-2">
        <p>Name: {name}</p>
        <p>Bundle: {units}</p>
        <p>Location: {location}</p>
        <p>Seller: {seller}</p>
      </div>

      <p>Price: {price}</p>
      <button className="cart-item-qty-change-button" onClick={(e) => remove(e)} value="test" >–</button>
        <div className="cart-item-qty">{itemQuantity}</div>
      <button className="cart-item-qty-change-button" onClick={(e) => add(e)} value="test" >+</button>
      <p>Subtotal: {price * itemQuantity}</p>
    </div>
  )
}

export default CartItem;
