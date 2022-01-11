import React, { useState, useEffect } from "react";

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
  },) // remove user dependence?

  return (
    <div className={(activePetCount < pet.quantity) ? "pet-card" : "pet-card full-pet-card"}>
      <ul>
        <li><img width="250" height="250" src={pet.photo} alt="" /></li>
        <li>{pet.name}</li>
        <li>{pet.species}</li>
        <li>{pet.breed}</li>
        <li>{pet.seller}</li>
        <li>${pet.price}</li>
        <li>{pet.quantity}</li>
        <li>Number in your cart: { activePetCount }</li>
        <button
          onClick={(e) => {
            if ((activePetCount < pet.quantity)) {
              addToCart(e)
              setActivePetCount(activePetCount + 1)
            } else {
              console.log("Cannot add more")
            }}
          }
          value={index} >
          Add to cart
        </button>
      </ul>
    </div>
  )
}

export default Pet;
