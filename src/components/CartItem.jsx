import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../css_components/cartitem.css';

const CartItem = ({ url, userList, quantityInCart, quantityAvailable, seller, units, category, price, name, food, user, location, setCartNum, setTotalPrice, setCartRefreshTrigger }) => {
  const [itemQuantity, setItemQuantity] = useState(quantityInCart);
  const [sellerName, setSellerName] = useState("");

  useEffect(() => {
    // fetch(/cart/fetch`).then(res => {
    //   return res.json()
    // }).then((jsonRes) => {
    //   if (user === null) return
    //   setActiveFoodCount(jsonRes.cart_list.filter(function (item) {
    //     return item.shopper === user._id
    //   }).map(function (array) {
    //     return array.food
    //   }).filter(foodInCart => foodInCart === food._id).length)
    // })
    setSellerName(userList.find((element) => {
      return element._id === seller
    }).name);
  }, [seller, userList]) // remove user dependence?


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
        url: `${process.env.REACT_APP_URL_BASE_BACKEND}/cart/add`
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
        url: `${process.env.REACT_APP_URL_BASE_BACKEND}/cart/remove`
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
    <>
      <div className="cart-item-container">
        <div className="cart-divider-left">
          {/* <div className="cart-divider-left-top"> */}
          <img className="cart-img" src={category === "Vegetable" ? "carrot-solid.svg" : (category === "Fruit" ? "apple-alt-solid.svg" : "egg-solid.svg")} alt="" />
          {/* </div> */}
          <div className="cart-divider-left-bottom">
            <ul>
              <li><strong>Item: </strong>{name}</li>
              <li><strong>Bundle: </strong>{units} / item</li>
              <li><strong>Location: </strong>{location}</li>
              <li><strong>Seller: </strong>{sellerName}</li>
            </ul>
          </div>
        </div>

        <div className="cart-divider-right">
          <div className="cart-item-qty-buttons">
            <button className="cart-item-qty-change-button cart-item-qty-change-button-left" onClick={(e) => remove(e)} value="test" >–</button>
              <div className="cart-item-qty">{itemQuantity}</div>
            <button className="cart-item-qty-change-button cart-item-qty-change-button-right" onClick={(e) => add(e)} value="test" >+</button>
          </div>
          <i className="qty-indicator">Quantity</i>
          <p className="cart-item-price">Price: ${price.toFixed(2)}</p>
          <p className="cart-item-subtotal">Subtotal: ${(price * itemQuantity).toFixed(2)}</p>
        </div>
      </div>
      <div className="cart-item-bottom-separator"></div>
    </>
  )
}

export default CartItem;
