import React, { useState, useEffect } from "react";
import CartItem from '../components/CartItem';
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
              output.push([countData[index], pet._id, pet.name, pet.species, pet.breed, pet.price, pet.photo, pet.quantity, pet.seller, pet])
            }
          });
          return output;
        })

        const priceTotal = fullData.map(item => {
          return (item[0][0] * item[0][5])
        }).reduce((partial_sum, a) => partial_sum + a, 0)
        setCartItems(fullData) // this
        setTotalPrice(priceTotal) // this
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  // const removeItem = (e) => {

  // }
  function accessStripeCart() {
    console.log("here")
    fetch('http://localhost:5000/cart/create-checkout-session', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
      }),
    })
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(({ url }) => {
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
          key={cartItem[0][1]}
          url={cartItem[0][6]}
          id={cartItem[0][1]}
          quantityInCart={cartItem[0][0]}
          name={cartItem[0][2]}
          animal={cartItem[0][3]}
          species={cartItem[0][4]}
          price={cartItem[0][5]}
          quantityAvailable={cartItem[0][7]}
          seller={cartItem[0][8]}
          pet={cartItem[0][9]}
          user={user}f
          setCartNum={setCartNum}
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
