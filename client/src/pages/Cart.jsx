import React, { useState, useEffect } from "react";
import CartItem from '../components/CartItem';
import Axios from 'axios';

// import StripeCheckout from 'react-stripe-checkout'

function Cart({ user, setCartNum }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

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
                petId: pet._id,
                petName: pet.name,
                petSpecies: pet.species,
                petBreed: pet.breed,
                petPrice: pet.price,
                petPhoto: pet.photo,
                petQuantity: pet.quantity,
                petSeller: pet.seller,
                petObj: pet
              })
            }
          });
          return output[0];
        })
        console.log(fullData)

        const priceTotal = fullData.map(item => {
          return (item.itemCartQuantity * item.petPrice)
        }).reduce((partial_sum, a) => partial_sum + a, 0)
        setCartItems(fullData) // this
        setTotalPrice(priceTotal) // this
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

    function accessStripeCart() {
    console.log("here")
    fetch('http://localhost:5000/cart/create-checkout-session', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
        user: user,
      }),
    })
    .then(res => {
      console.log("starting this stuff")
      if (res.ok) {
        return res.json()
      }
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      console.log("starting this stuff 2")
      // wipeCart();
      // adjustQuantities(cartItems);
      window.location = url
    })
    .catch(e => {
      console.error(e.error)
    })
  }

  return (
    <div>
      <h1>Header</h1>
      {cartItems.map((cartItem, index) => (
        <CartItem
          key={cartItem.petId}
          id={cartItem.petId}
          url={cartItem.petPhoto}
          quantityInCart={cartItem.itemCartQuantity}
          name={cartItem.petName}
          breed={cartItem.petBreed}
          species={cartItem.petSpecies}
          price={cartItem.petPrice}
          quantityAvailable={cartItem.petQuantity}
          seller={cartItem.petSeller}
          pet={cartItem.petObj}
          user={user}
          setCartNum={setCartNum}
          setTotalPrice={setTotalPrice}
        />
      ))}

      <p>Total: {totalPrice}</p>
      <button onClick={() => accessStripeCart()}>Check out</button>
      {/* <StripeCheckout
        stripeKey="pk_test_51KGr2RDsDjOodD6xPUNk6nfQtFblwWxaPcBtCxsu9rtqWJy5RBaqY4y6LNN31c9H4H3yeMUu4MXqIW4Nmqyz9YqQ00CKhhTOcO" // public key, can share
        token={handleToken}
        billingAddress
        shippingAddress
        amount={totalPrice}
      /> */}
    </div>
  )
}

export default Cart;
