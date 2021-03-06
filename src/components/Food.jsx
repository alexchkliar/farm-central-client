import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';

const Food = ({ food, index, addToCart, addToFavorite, user, userList, deleteFromFavorite }) => {
  const [activeFoodCount, setActiveFoodCount] = useState(0);
  const [sellerName, setSellerName] = useState("");
  const [favoritedStatus, setFavoritedStatus] = useState(false);

  useEffect(() => {
    const abortCont = new AbortController();
    const signal = abortCont.signal

    fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/cart/fetch`, {signal})
    .then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return
      setActiveFoodCount(jsonRes.cart_list.filter(function (item) {
        return item.shopper === user._id
      }).map(function (array) {
        return array.food
      }).filter(foodInCart => foodInCart === food._id).length)
    }).catch(err => {
      if (err.name === "AbortError") {
        // console.log("Fetch aborted");
      } else {
        throw err
      }
    })

    if(userList.length !== 0) {
      setSellerName(userList.find((element) => {
        return element._id === food.seller
      }).name);
    }

    const cancelToken = Axios.CancelToken;
    const source = cancelToken.source();

    if (user) {
      Axios({
        cancelToken: source.token,
        method: "POST",
        data: {
          food: food,
          shopper: user
        },
        withCredentials: true,
        url: `${process.env.REACT_APP_URL_BASE_BACKEND}/favorite/check`
      }).then((res) => {
        setFavoritedStatus(res.data)
      }).catch((err) => {
        // console.log(err);
      })
    }

    return () => {
      abortCont.abort();
      source.cancel();
    };

  }, [user, food._id, food.seller, userList, sellerName, food, index]) // remove dependence?

  function handleCartEvent() {
    if (user === null) {
      // console.log(window.location.hostname === "localhost")
      window.location.href = `/login`;
    }
    if ((activeFoodCount < food.quantity)) {
      addToCart(index)
      setActiveFoodCount(prevActiveFoodCount => prevActiveFoodCount + 1)
    } else {
      // console.log("Cannot add more")
    }
  }

  function handleFavoriteEvent() {
    if (user === null) {
      window.location.href = `/login`;
    }
    if (favoritedStatus === false) {
      addToFavorite(index)
    } else {
      deleteFromFavorite(index)
    }
    setFavoritedStatus(currentStatus => !currentStatus)
  }

  return (
    <div className={(activeFoodCount < food.quantity) ? "food-card" : "food-card full-food-card"}>
      <ul className={"food-ul" + (food.quantity < 1 ? " empty-food-card" : "")}>
        <img className="food-card-img" src={food.category === "Vegetable" ? "carrot-solid.svg" : (food.category === "Fruit" ? "apple-alt-solid.svg" : "egg-solid.svg")} alt={food.name} />
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
              <li className="list-food-available">{(food.quantity > 0) ? (food.quantity + " available") : "Sold out"}</li>
              <li className="list-food-breed">Seller: {sellerName}</li>
            </div>
          </div>
          <div className="add-to-cart-button" onClick={() => handleCartEvent()}>
            <div className="cart-plus-symbol">+1 </div>
            <div className="add-to-cart-text">ADD TO CART</div>

          </div>
        </div>
        <div data-testid="favorite-icon" className={"favorite-icon-div" + (favoritedStatus ? " favorite-icon-div-favorited" : "")} onClick={() => handleFavoriteEvent()}>
          <FontAwesomeIcon icon={faHeart} className={"favorite-icon" + (favoritedStatus ? " favorited" : "")} />
        </div>

        <div className="food-cart-wrapper">
          <FontAwesomeIcon icon={faShoppingCart} className="font-awesome-icon food-cart" /><div className="food-cart-number">{activeFoodCount}</div>
        </div>

      </ul>
    </div>
  )
}

export default Food;
