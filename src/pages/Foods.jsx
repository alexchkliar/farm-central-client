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
  const [favoritesOn, setFavoritesOn] = useState(false);
  const loadItems = 27 // works best with 1440p


  useEffect(() => {
    const abortCont = new AbortController();
    const signal = abortCont.signal

    Promise.all([
      fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/favorite/fetch`, { signal}),
      fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/foods`, { signal }),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        const favoriteFoodIdList = data1.favorite_list.map((item) => { return item.food })
        const favoriteFoodShopperList = data1.favorite_list.map((item) => { return item.shopper })
        let foodList = []

        if (favoritesOn && user) {
          foodList = data2.food_list.filter((food) => {
            let flag = false;
            favoriteFoodIdList.forEach((foodItem, index) => {
              if (foodItem === food._id && favoriteFoodShopperList[index] === user._id) { flag = true }
            });
            return flag
          })
        } else {
          foodList = data2.food_list
        }

        if (user) {
          const outputList = foodList.filter(function (food) {
            return food.seller !== user._id && (food.category === activeFood || activeFood === "All")
          })
          setMaxLength(outputList.length)
          setFoods(outputList.slice(0, loadItems))

        } else {
          const outputList = foodList.filter(function (food) {
            return (food.category === activeFood || activeFood === "All")
          })
          setMaxLength(outputList.length)
          setFoods(outputList.slice(0, loadItems))
          console.log(outputList)
        }
    }).catch(err => {
      if (err.name === "AbortError") {
        // console.log("Fetch aborted")
      } else {
        throw err
      }
    })

    return () => { abortCont.abort() };
  }, [activeFood, user, favoritesOn])

  const fetchMoreData = () => {
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
          foodList = data2.food_list.filter((food) => {
            let flag = false;
            favoriteFoodIdList.forEach((foodItem, index) => {
              if (foodItem === food._id && favoriteFoodShopperList[index] === user._id) { flag = true }
            });
            return flag
          })
        } else {
          foodList = data2.food_list
        }

        if (user) {
          const outputList = foodList.filter(function (food) {
            return food.seller !== user._id && (food.category === activeFood || activeFood === "All")
          })
          setFoods(foods.concat(outputList.slice(foods.length, foods.length + loadItems)))
        } else {
          const outputList = foodList.filter(function (food) {
            return (food.category === activeFood || activeFood === "All")
          })
          setFoods(foods.concat(outputList.slice(foods.length, foods.length + loadItems)))
        }
      }).catch(err => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted")
        } else {
          throw err
        }
      })

    return () => { abortCont.abort() };

  };

  const addToCart = (index) => {
    const cancelToken = Axios.CancelToken;
    const source = cancelToken.source();

    if (user === null) {
      window.location.href = `/login`;
    }
    setCartNum(cartNum => cartNum + 1);

    Axios({
      cancelToken: source.token,
      method: "POST",
      data: {
        food: foods[index],
        shopper: user
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_URL_BASE_BACKEND}/cart/add`
    }).then((res) => {
      // console.log(res.data);
    })

    return () => { source.cancel("Cart add aborted"); };

  }

  const addToFavorite = (index) => {
    if (user === null) {
      window.location.href = `/login`;
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
      // console.log(res.data);
    })
  }

  const deleteFromFavorite = (index) => {
    if (user === null) {
      window.location.href = `/login`;
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
      // console.log(res.data);
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
      <h1 className="header-h1">Browse food</h1>
      <div className="food-button-wrapper">
        <div className="food-selector-wrapper">
          <button className={"food-selector-button " + (activeFood === "All" ? "active-food" : "")} onClick={() => setActiveFood("All")} value="All">All</button>
          <button className={"food-selector-button " + (activeFood === "Vegetable" ? "active-food" : "")} onClick={() => setActiveFood("Vegetable")} value="Vegetable">Veg</button>
          <button className={"food-selector-button " + (activeFood === "Fruit" ? "active-food" : "")} onClick={() => setActiveFood("Fruit")} value="Fruit">Fruits</button>
          <button className={"food-selector-button " + (activeFood === "Other" ? "active-food" : "")} onClick={() => setActiveFood("Other")} value="Other">Other</button>
        </div>
          { user?
            <button className={"favorite-selector-button " + (favoritesOn === true ? "active-favorites" : "")} onClick={() => setFavoritesOn(favoritesStatus => !favoritesStatus)} value="Other">Favorites</button>
          : "" }
      </div>

      <div className="food-wrapper">
        <InfiniteScroll
          dataLength={foods.length}
          next={fetchMoreData}
          hasMore={maxLength > foods.length}
          loader
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
