import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Food = ({ food, index, addToCart, user }) => {
  const [activeFoodCount, setActiveFoodCount] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/cart/fetch").then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return
      setActiveFoodCount(jsonRes.cart_list.filter(function (item) {
        return item.shopper === user._id
      }).map(function (array) {
        return array.food
      }).filter(foodInCart => foodInCart === food._id).length)
    })
  }, [user, food._id]) // remove dependence?

  function handleEvent() {
    if (user === null) {
      window.location.href = "http://localhost:3000/login";
    }
    if ((activeFoodCount < food.quantity)) {
      console.log("index " + index)
      addToCart(index)
      setActiveFoodCount(prevActiveFoodCount => prevActiveFoodCount + 1)
    } else {
      console.log("Cannot add more")
    }
  }

  return (
    <div className={(activeFoodCount < food.quantity) ? "food-card" : "food-card full-food-card"}>
      <ul className="food-ul">
        <img className="food-card-img" src={food.photo} alt="" />
        <li className="list-food-name">{food.name}</li>
        {/* <li className="list-food-species">Species: {food.species}</li>
        {/* <li className="list-food-seller">Seller: {food.seller}</li> */}
        <li className="list-food-breed">Seller: {food.breed}</li>
        <p className="list-food-price">${food.price}</p>
        <li className="list-food-quantity">Available: {food.quantity}</li>
        <div className="food-cart-wrapper">
          <FontAwesomeIcon icon={faShoppingCart} className="font-awesome-icon food-cart" /> <p className="food-cart-number">{activeFoodCount}</p>
        </div>

        <button className="add-to-cart-button" onClick={() => handleEvent()}>
          ADD TO CART
        </button>
      </ul>
    </div>
  )
}

export default Food;
