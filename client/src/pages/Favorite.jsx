import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingFavorite } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';

const Favorites = ({ user }) => {
  useEffect(() => {
    Promise.all([
      fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/favorite/fetch`),
      fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/foods`),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        console.log(data1)
        const favoriteData = data1.favorite_list.filter((item) => {
          return item.shopper === user._id
        }).map((item) => { return item.food })
        // const favoriteData = data1.favorite_list.map((item) => { return item.food })
        // console.log(data1.favorite_list)
        // console.log(favoriteData)
        // console.log(user)
        const favoriteDataUnique = [...new Set(favoriteData)].sort();
        // console.log(favoriteDataUnique)

        const fullData = favoriteDataUnique.map((item, index) => {
          let output = []
          data2.food_list.forEach(food => {
            if (food._id === item) {
              output.push({
                foodId: food._id,
                foodName: food.name,
                foodCategory: food.category,
                foodUnits: food.units,
                foodPrice: food.price,
                foodPhoto: food.photo,
                foodQuantity: food.quantity,
                foodSeller: food.seller,
                foodLocation: food.location,
                foodObj: food
              })
            }
          });
          return output[0];
        })
        console.log(fullData)


      })
      .catch(err => {
        // console.log(err)
      })
  }, [user])

  return (
    <div className="">

    </div>
  )
}

export default Favorites;
