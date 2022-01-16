import React, { useEffect, useCallback } from "react";
import Axios from 'axios';

function CartCleanup({ user }) {
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  const registerNewOrder = useCallback((fullData) => {
    console.log("creating new order")
    Axios({
      method: "POST",
      data: {
        items: fullData,
        buyer: user
      },
      withCredentials: true,
      url: "http://localhost:5000/cart/create_order"
    })
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.error(e)
      })
  }, [user]);

  const wipeCart = useCallback(() => {
    console.log("wiping cart")
    Axios({
      method: "DELETE",
      data: {
        shopper: user
      },
      withCredentials: true,
      url: "http://localhost:5000/cart/wipe"
    })
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.error(e)
      })
  }, [user]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/cart/fetch'),
      fetch('http://localhost:5000/foods'),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        const cartData = data1.cart_list.map((item) => { return item.food })
        const cartDataUnique = [...new Set(cartData)];
        const countData = cartDataUnique.map(item => {
          return countOccurrences(cartData, item)
        })
        const fullData = cartDataUnique.map((item, index) => {
          let output = []
          data2.food_list.forEach(food => {
            if (food._id === item) {
              output.push({
                itemCartQuantity: countData[index],
                foodId: food._id, foodName: food.name, foodSpecies: food.species, foodBreed: food.breed, foodPrice: food.price, foodPhoto: food.photo, foodQuantity: food.quantity, foodSeller: food.seller, foodObj: food
              })
            }
          });
          return output[0];
        })
        console.log("user")
        console.log(user)
        if (user) {
          console.log("we are here")
          console.log(user + " user")
          adjustInventory(fullData)
          registerNewOrder(fullData)
          wipeCart()
          redirect()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [registerNewOrder, wipeCart, user])

  function adjustInventory(fullData) {
    console.log("adjusting inventory")
    Axios({
      method: "PATCH",
      data: {
        cartItems: fullData
      },
      withCredentials: true,
      url: "http://localhost:5000/cart/adjust"
    })
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.error(e)
      })
  }

  function redirect () {
    // window.location = 'http://localhost:3000/orders'
  }

  return (
    <>
    </>
  )
}

export default CartCleanup;
