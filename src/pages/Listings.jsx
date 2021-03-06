import React, { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import '../css_components/foods.css';
import '../css_components/listings.css';
import Listing from '../components/Listing';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function Listings({ user, userList }) {
  const [activeFood, setActiveFood] = useState("All");
  const [foods, setFoods] = useState([]);
  const [maxLength, setMaxLength] = useState(0);
  const [productList, setProductList] = useState([]);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [messageClass, setMessageClass] = useState("message-inactive");
  const [deletedItem, setDeteledItem] = useState("");

  const loadItems = 27 // works best with 1440p
  // const onHide = () => setModalShowClose(false)

  const handleClick = (props) => {
    Axios({
      method: "DELETE",
      data: {
        food: props,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_URL_BASE_BACKEND}/foods/${props._id}/delete`
    }).then((res) => {
      if (res.data.message === "Successfully deleted") {
        setDeleteTrigger(currentValue => !currentValue)
      };
    }).catch((err) => {
      // console.log(err);
    })

  }

  useEffect(() => {
    const abortCont = new AbortController();
    const signal = abortCont.signal

      fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/foods`, { signal })
      .then(res => {return res.json()})
      .then((data) => {
        let foodList = []

        foodList = data.food_list

        if (user) {
          const outputList = foodList.filter(function (food) {
            return food.seller === user._id && (food.category === activeFood || activeFood === "All")
          }).slice(0, loadItems)
          setMaxLength(outputList.length)
          setFoods(outputList)
        } else {
          const outputList = foodList.filter(function (food) {
            return (food.category === activeFood || activeFood === "All")
          }).slice(0, loadItems)
          setMaxLength(outputList.length)
          setFoods(outputList)
        }
      }).catch(err => {
        if (err.name === "AbortError") {
          // console.log("Fetch aborted")
        } else {
          throw err
        }
      })
    return () => { abortCont.abort() };

  }, [activeFood, user, deleteTrigger])

  const fetchMoreData = () => {
      fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/foods`)
      .then(res => {return res.json()})
      .then((data) => {
        let foodList = []
        foodList = data.food_list

        if (user) {
          const outputList = foodList.filter(function (food) {
            return food.seller === user._id && (food.category === activeFood || activeFood === "All")
          })
          const foodToSet = foods.concat(outputList.slice(foods.length, foods.length + loadItems))
          setFoods(foodToSet)
        } else {
          const outputList = foodList.filter(function (food) {
            return (food.category === activeFood || activeFood === "All")
          })
          const foodToSet = foods.concat(outputList.slice(foods.length, foods.length + loadItems))
          setFoods(foodToSet)
        }
      }).catch(err => {
        if (err.name === "AbortError") {
          // console.log("Fetch aborted")
        } else {
          throw err
        }
      })
  };

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

  if (foods.length >= 1) {
    return (
      <div className="">
        <h1 className="header-h1">Your listings</h1>
        <div className="food-button-wrapper">
          <div className="food-selector-wrapper">
            <button className={"food-selector-button " + (activeFood === "All" ? "active-food" : "")} onClick={() => setActiveFood("All")} value="All">All</button>
            <button className={"food-selector-button " + (activeFood === "Vegetable" ? "active-food" : "")} onClick={() => setActiveFood("Vegetable")} value="Vegetable">Veg</button>
            <button className={"food-selector-button " + (activeFood === "Fruit" ? "active-food" : "")} onClick={() => setActiveFood("Fruit")} value="Fruit">Fruits</button>
            <button className={"food-selector-button " + (activeFood === "Other" ? "active-food" : "")} onClick={() => setActiveFood("Other")} value="Other">Other</button>
          </div>
        </div>
        <div className={messageClass + " message-popup"}>
          <FontAwesomeIcon data-testid="favorite-icon" icon={faCheckCircle} className="popup-checkmark" />
          Successfully deleted {deletedItem.toLowerCase()}!
        </div>
        <div className="food-wrapper">
          <InfiniteScroll
            dataLength={foods.length}
            next={fetchMoreData}
            hasMore={maxLength > foods.length}
            loader
          >
            {foods.map((food, index) => (
              <Listing
                setDeteledItem={setDeteledItem}
                setMessageClass={setMessageClass}
                handleClick={handleClick}
                key={index}
                index={index}
                userList={userList}
                food={food}
                foodCountInCart={productList.filter(foodInCart => foodInCart === food._id).length}
                user={user}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <h1 className="header-h1">Your listings</h1>
        <div className="food-button-wrapper">
          <div className="food-selector-wrapper">
            <button className={"food-selector-button " + (activeFood === "All" ? "active-food" : "")} onClick={() => setActiveFood("All")} value="All">All</button>
            <button className={"food-selector-button " + (activeFood === "Vegetable" ? "active-food" : "")} onClick={() => setActiveFood("Vegetable")} value="Vegetable">Veg</button>
            <button className={"food-selector-button " + (activeFood === "Fruit" ? "active-food" : "")} onClick={() => setActiveFood("Fruit")} value="Fruit">Fruits</button>
            <button className={"food-selector-button " + (activeFood === "Other" ? "active-food" : "")} onClick={() => setActiveFood("Other")} value="Other">Other</button>
          </div>
        </div>
        <div className="no-sales-container">
          <span>You have no active listings in this category yet. </span>
          <a href="/foods/new">List your food now!</a>
        </div>
      </>
    )
  }
}

export default Listings;
