import React, { useState, useEffect, useCallback } from "react";
import Axios from 'axios';

function CartCleanup({ user }) {
  const [cartItems, setCartItems] = useState([]);
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
      fetch('http://localhost:5000/pets'),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        const cartData = data1.cart_list.map((item) => { return item.pet })
        const cartDataUnique = [...new Set(cartData)];
        const countData = cartDataUnique.map(item => {
          return countOccurrences(cartData, item)
        })
        const fullData = cartDataUnique.map((item, index) => {
          let output = []
          data2.pet_list.forEach(pet => {
            if (pet._id === item) {
              output.push({
                itemCartQuantity: countData[index],
                petId: pet._id, petName: pet.name, petSpecies: pet.species, petBreed: pet.breed, petPrice: pet.price, petPhoto: pet.photo, petQuantity: pet.quantity, petSeller: pet.seller, petObj: pet
              })
            }
          });
          return output[0];
        })
        setCartItems(fullData) // this
        console.log("user")
        console.log(user)
        if (user) {
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
    // window.location = 'http://localhost:3000/'
  }



  return (
    <>
    </>
  )
}

export default CartCleanup;
