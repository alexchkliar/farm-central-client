import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Food = ({ food, index, addToCart, user, userList }) => {
  const [activeFoodCount, setActiveFoodCount] = useState(0);
  const [sellerName, setSellerName] = useState("");
  const [favoritedStatus, setFavoritedStatus] = useState(false);

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


    setSellerName(userList.find((element) => {
      return element._id === food.seller
    }).name);
  }, [user, food._id, food.seller, userList, sellerName]) // remove dependence?

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
      <ul className={"food-ul" + (food.quantity === 0 ? " empty-food-card" : "")}>
        <img className="food-card-img" src={food.category === "Vegetable" ? "carrot-solid.svg" : (food.category === "Fruit" ? "apple-alt-solid.svg" : "egg-solid.svg")} alt="" />
        <div className="food-cart-bottom-container">

          <div className="food-card-text-container">
            <div className="food-card-left">
              <li className="list-food-name">{food.name}</li>
              <li className="list-food-units">{food.units}</li>
              <li className="list-food-rating">
                <FontAwesomeIcon icon={farStar} className="font-awesome-icon star" />
                <span> </span>
                {food.rating.toFixed(1)}
              </li>
            </div>

            <div className="food-card-right">
              <li className="list-food-price">${food.price.toFixed(2)}</li>
              <li className="list-food-available">{ (food.quantity > 0) ? (food.quantity + " availble") : "Sold out"}</li>
              <li className="list-food-breed">Seller: {sellerName}</li>
            </div>
          </div>
          <div className="add-to-cart-button" onClick={() => handleEvent()}>+1 TO CART</div>
        </div>
        <div className={"favorite-icon-div" + (favoritedStatus ? " favorite-icon-div-favorited" : "")} onClick={() => setFavoritedStatus(currentStatus => !currentStatus)}>
          <FontAwesomeIcon icon={faHeart} className={"favorite-icon" + (favoritedStatus ? " favorited" : "") } />
        </div>

        <div className="food-cart-wrapper">
          <FontAwesomeIcon icon={faShoppingCart} className="font-awesome-icon food-cart" /><div className="food-cart-number">{activeFoodCount}</div>
        </div>

      </ul>
    </div>
  )
}

export default Food;
