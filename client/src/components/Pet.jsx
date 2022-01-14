import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Pet = ({ pet, index, addToCart, user }) => {
  const [activePetCount, setActivePetCount] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/cart/fetch").then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return
      setActivePetCount(jsonRes.cart_list.filter(function (item) {
        return item.shopper === user._id
      }).map(function (array) {
        return array.pet
      }).filter(petInCart => petInCart === pet._id).length)
    })
  }, [user, pet._id]) // remove dependence?

  function handleEvent() {
    if (user === null) {
      window.location.href = "http://localhost:3000/login";
    }
    if ((activePetCount < pet.quantity)) {
      console.log("index " + index)
      addToCart(index)
      setActivePetCount(prevActivePetCount => prevActivePetCount + 1)
    } else {
      console.log("Cannot add more")
    }
  }

  return (
    <div className={(activePetCount < pet.quantity) ? "pet-card" : "pet-card full-pet-card"}>
      <ul className="pet-ul">
        <img className="pet-card-img" src={pet.photo} alt="" />
        <li className="list-pet-name">{pet.name}</li>
        {/* <li className="list-pet-species">Species: {pet.species}</li>
        {/* <li className="list-pet-seller">Seller: {pet.seller}</li> */}
        <li className="list-pet-breed">Seller: {pet.breed}</li>
        <p className="list-pet-price">${pet.price}</p>
        <li className="list-pet-quantity">Available: {pet.quantity}</li>
        <div className="pet-cart-wrapper">
          <FontAwesomeIcon icon={faShoppingCart} className="font-awesome-icon pet-cart" /> <p className="pet-cart-number">{activePetCount}</p>
        </div>

        <button className="add-to-cart-button" onClick={() => handleEvent()}>
          ADD TO CART
        </button>
      </ul>
    </div>
  )
}

export default Pet;
