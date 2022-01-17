import React, { useState, useEffect } from "react";
import CartItem from '../components/CartItem';

// import StripeCheckout from 'react-stripe-checkout'

function Cart({ user, setCartNum, userList }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartRefreshTrigger, setCartRefreshTrigger] = useState(0);

  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.URL_BASE_BACKEND}/cart/fetch`),
      fetch(`${process.env.URL_BASE_BACKEND}/foods`),
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        const cartData = data1.cart_list.filter((item) => {
          return item.shopper === user._id
        }).map((item) => { return item.food })
        // const cartData = data1.cart_list.map((item) => { return item.food })
        console.log(data1.cart_list)
        console.log(cartData)
        console.log(user)
        const cartDataUnique = [...new Set(cartData)].sort();
        const countData = cartDataUnique.map(item => {
          return countOccurrences(cartData, item)
        })
        const fullData = cartDataUnique.map((item, index) => {
          let output = []
          data2.food_list.forEach(food => {
            if (food._id === item) {
              output.push({
                itemCartQuantity: countData[index],
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

        const priceTotal = fullData.map(item => {
          return (item.itemCartQuantity * item.foodPrice)
        }).reduce((partial_sum, a) => partial_sum + a, 0)
        // console.log("before here 1?")
        setCartItems(fullData) // this
        // console.log(fullData)
        setTotalPrice(priceTotal) // this
      })
      .catch(err => {
        // console.log(err)
      })
  }, [cartRefreshTrigger, user])

  function accessStripeCart() {
    // console.log("here")
    fetch(`${process.env.URL_BASE_BACKEND}/cart/create-checkout-session`, {
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
      // console.log("starting this stuff")
      if (res.ok) {
        return res.json()
      }
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      // console.log("starting this stuff 2")
      // wipeCart();
      // adjustQuantities(cartItems);
      window.location = url
    })
    .catch(e => {
      console.error(e.error)
    })
  }

console.log(user)

  if (cartItems.length >= 1) {
    return (
      <>
        <h1 className="header-h1">My shopping cart</h1>
        <div className="main-cart-wrapper">
          <div className="cart-table-headers">
            <li className="cart-details-header">Details</li>
            <li className="cart-totals-header">Totals</li>
          </div>
          {cartItems.map((cartItem, index) => (
            <CartItem
              key={cartItem.foodId}
              id={cartItem.foodId}
              url={cartItem.foodPhoto}
              quantityInCart={cartItem.itemCartQuantity}
              name={cartItem.foodName}
              units={cartItem.foodUnits}
              category={cartItem.foodCategory}
              price={cartItem.foodPrice}
              quantityAvailable={cartItem.foodQuantity}
              location={cartItem.foodLocation}
              seller={cartItem.foodSeller}
              food={cartItem.foodObj}
              user={user}
              setCartNum={setCartNum}
              setTotalPrice={setTotalPrice}
              setCartItems={setCartItems}
              setCartRefreshTrigger={setCartRefreshTrigger}
              userList={userList}
            />
          ))}
          <div className="bottom-cart-checkout">
            <p className="cart-total">Total: ${totalPrice.toFixed(2)}</p>
            <button className="checkout-button" onClick={() => accessStripeCart()}>Checkout</button>
          </div>
          {/* <StripeCheckout
            stripeKey="pk_test_51KGr2RDsDjOodD6xPUNk6nfQtFblwWxaPcBtCxsu9rtqWJy5RBaqY4y6LNN31c9H4H3yeMUu4MXqIW4Nmqyz9YqQ00CKhhTOcO" // public key, can share
            token={handleToken}
            billingAddress
            shippingAddress
            amount={totalPrice}
          /> */}
        </div>
      </>
    )
  } else {
    return (
      <>
        <h1 className="header-h1">My shopping cart</h1>
        <p>Shopping cart is empty</p>
      </>
    )
  }
}

export default Cart;
