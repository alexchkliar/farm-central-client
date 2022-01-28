import React, { useState, useEffect } from "react";
import '../css_components/foods.css';
import Food from '../components/Food';
import '../css_components/listings.css';

function Listings({ user, userList }) {
  const [activeFood, setActiveFood] = useState("All");
  const [foods, setFoods] = useState([]);
  const [maxLength, setMaxLength] = useState(0);
  const [productList, setProductList] = useState([]);
  const [favoritesOn, setFavoritesOn] = useState(false);
  const loadItems = 27 // works best with 1440p


  useEffect(() => {
    const abortCont = new AbortController();
    const signal = abortCont.signal

    Promise.all([
      fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/favorite/fetch`, { signal }),
      fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/foods`, { signal }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        const favoriteFoodIdList = data1.favorite_list.map((item) => { return item.food })
        const favoriteFoodShopperList = data1.favorite_list.map((item) => { return item.shopper })
        let foodList = []

        if (favoritesOn && user) {
          foodList = data2.food_list.filter((food) => { return (favoriteFoodIdList.includes(food._id) && favoriteFoodShopperList.includes(user._id)) })
        } else {
          foodList = data2.food_list
        }
        console.log(foodList)

        if (user) {
          const outputList = foodList.filter(function (food) {
            return food.seller === user._id && (food.category === activeFood || activeFood === "All")
          })
          setMaxLength(outputList.length)
          setFoods(outputList)
          console.log(outputList)

        } else {
          const outputList = foodList.filter(function (food) {
            return (food.category === activeFood || activeFood === "All")
          })
          setMaxLength(outputList.length)
          setFoods(outputList)
        }
      }).catch(err => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted")
        } else {
          throw err
        }
      })
    // return () => console.log("cleanup")

    return () => { abortCont.abort() };

  }, [activeFood, user, favoritesOn])

  return (
    <div className="">
      <h1 className="header-h1">Browse food</h1>
      {foods.map((food, index) => (
        <>
          <ul>
            <li>{food.name}</li>
          </ul>
          <br />
        </>
      ))}
    </div>
  )
}

export default Listings;
