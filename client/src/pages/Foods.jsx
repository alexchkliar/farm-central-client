import React, { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import '../css_components/foods.css';
import Axios from 'axios';
import Food from '../components/Food';

function Foods({ setCartNum, user, userList }) {
  const [activeFood, setActiveFood] = useState("All");
  const [foods, setFoods] = useState([]);
  const [maxLength, setMaxLength] = useState(0);
  const [productList, setProductList] = useState([]);
  // const [userList, setUserList] = useState([]);
  const loadItems = 27 // works best with 1440p

  useEffect(() => {
    fetch("http://localhost:5000/foods").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then((jsonRes) => {
      if (user) {
        const outputList = jsonRes.food_list.filter(function (food) {
          return food.seller !== user._id && (food.category === activeFood || activeFood === "All")
        })
        setMaxLength(outputList.length)
        setFoods(outputList.slice(0, loadItems))
      } else {
        const outputList = jsonRes.food_list.filter(function (food) {
          return (food.category === activeFood || activeFood === "All")
        })
        setMaxLength(outputList.length)
        setFoods(outputList.slice(0, loadItems))
      }
    })
  }, [activeFood, user])

  const fetchMoreData = () => {
    fetch("http://localhost:5000/foods").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then((jsonRes) =>
      setFoods(foods.concat(jsonRes.food_list.filter(function (food) {
        // return (food.quantity >= 1 && (food.category === activeFood || activeFood === "All"))
        return food.seller !== user && (food.category === activeFood || activeFood === "All")
      }).slice(foods.length, foods.length + loadItems)))
    )
  };

  const addToCart = (index) => {
    if (user === null) {
      window.location.href = "http://localhost:3000/login";
      return
    }
    // console.log(user);
    console.log(index);
    console.log(foods[index]);
    setCartNum(cartNum => cartNum + 1);
    // cartAddDetail = { food: foods[e.target.value], shopper: user }

    Axios({
      method: "POST",
      data: {
        food: foods[index],
        shopper: user
      },
      withCredentials: true,
      url: "http://localhost:5000/cart/add"
    }).then((res) => {
      console.log(res.data);
      // if (res.data === "Successfully added") {
        // navigate("/");
        // window.open("http://localhost:3000/foods", "_self");
        // window.location.href = "http://localhost:3000/foods";
      // }
    })
  }

  useEffect(() => {
    fetch("http://localhost:5000/cart/fetch").then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return
      setProductList(jsonRes.cart_list.filter(function (item) {
        return item.shopper === user._id
      }).map(function (array) {
        return array.food
      }))
    })
  }, [user]) // remove user dependence?

  return (
    <div className="">
      <h1>Browse foods</h1>
      <div className="food-selector-wrapper">
        <button className={"food-selector-button " + (activeFood === "All" ? "active-food" : "")} onClick={() => setActiveFood("All")} value="All">All</button>
        <button className={"food-selector-button " + (activeFood === "Vegetable" ? "active-food" : "")} onClick={() => setActiveFood("Vegetable")} value="Vegetable">Vegetables</button>
        <button className={"food-selector-button " + (activeFood === "Fruit" ? "active-food" : "")} onClick={() => setActiveFood("Fruit")} value="Fruit">Fruits</button>
        <button className={"food-selector-button " + (activeFood === "Other" ? "active-food" : "")} onClick={() => setActiveFood("Other")} value="Other">Others</button>
      </div>

      <div className="food-wrapper">
        <InfiniteScroll
          dataLength={foods.length}
          next={fetchMoreData}
          hasMore={maxLength > foods.length}
          loader={<h5>Loading...</h5>}
        >
          {foods.map((food, index) => (
            <Food key={index} index={index} userList={userList} food={food} foodCountInCart={productList.filter(foodInCart => foodInCart === food._id).length} addToCart={addToCart} user={user} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Foods;
