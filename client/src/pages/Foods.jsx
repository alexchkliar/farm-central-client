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
    Axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_URL_BASE_BACKEND}/foods`
    }).then(async jsonRes => {
      console.log(jsonRes.data)
      const foodList = await jsonRes.data.food_list
      if (user) {
        const outputList = foodList.filter(function (food) {
          return food.seller !== user._id && (food.category === activeFood || activeFood === "All")
        })
        // console.log(outputList)
        setMaxLength(outputList.length)
        setFoods(outputList.slice(0, loadItems))
      } else {
        const outputList = foodList.filter(function (food) {
          return (food.category === activeFood || activeFood === "All")
        })
        setMaxLength(outputList.length)
        setFoods(outputList.slice(0, loadItems))
      }
    }).catch(err => {
      throw err
    })

    // return () => console.log("cleanup")

  }, [activeFood, user])

  const fetchMoreData = () => {
    fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/foods`).then(res => {
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
      window.location.href = `${process.env.REACT_APP_URL_BASE_CLIENT}/login`;
    }
    setCartNum(cartNum => cartNum + 1);

    Axios({
      method: "POST",
      data: {
        food: foods[index],
        shopper: user
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_URL_BASE_BACKEND}/cart/add`
    }).then((res) => {
      console.log(res.data);
    })
  }

  const addToFavorite = (index) => {
    if (user === null) {
      window.location.href = `${process.env.REACT_APP_URL_BASE_CLIENT}/login`;
    }

    Axios({
      method: "POST",
      data: {
        food: foods[index],
        shopper: user
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_URL_BASE_BACKEND}/favorite/add`
    }).then((res) => {
      console.log(res.data);
    })
  }

  const deleteFromFavorite = (index) => {
    if (user === null) {
      window.location.href = `${process.env.REACT_APP_URL_BASE_CLIENT}/login`;
    }

    Axios({
      method: "DELETE",
      data: {
        food: foods[index],
        shopper: user
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_URL_BASE_BACKEND}/favorite/remove`
    }).then((res) => {
      console.log(res.data);
    })
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/cart/fetch`).then(res => {
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
      <h1 className="header-h1">Browse foods</h1>
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
          loader={<p className="loader">Loading...</p>}
        >
          {foods.map((food, index) => (
            <Food
              key={index}
              index={index}
              userList={userList}
              food={food}
              foodCountInCart={productList.filter(foodInCart => foodInCart === food._id).length}
              addToCart={addToCart}
              addToFavorite={addToFavorite}
              deleteFromFavorite={deleteFromFavorite}
              user={user}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Foods;
