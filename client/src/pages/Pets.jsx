import React, { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import '../css_components/pets.css';
import Axios from 'axios';
import Pet from '../components/Pet';

function Pets({ setCartNum, user }) {
  const [activePet, setActivePet] = useState("All");
  const [pets, setPets] = useState([]);
  const [maxLength, setMaxLength] = useState(0);
  const [productList, setProductList] = useState([]);
  const loadItems = 27 // works best with 1440p

  useEffect(() => {
    fetch("http://localhost:5000/pets").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then((jsonRes) => {
      if (user) {
        const outputList = jsonRes.pet_list.filter(function (pet) {
          return pet.seller !== user._id && (pet.species === activePet || activePet === "All")
        })
        setMaxLength(outputList.length)
        setPets(outputList.slice(0, loadItems))
      }
    })
  }, [activePet, user])

  const fetchMoreData = () => {
    fetch("http://localhost:5000/pets").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then((jsonRes) =>
      setPets(pets.concat(jsonRes.pet_list.filter(function (pet) {
        // return (pet.quantity >= 1 && (pet.species === activePet || activePet === "All"))
        return pet.seller !== user && (pet.species === activePet || activePet === "All")
      }).slice(pets.length, pets.length + loadItems)))
    )
  };

  const addToCart = (index) => {
    if (user === null) {
      window.location.href = "http://localhost:3000/login";
      return
    }
    // console.log(user);
    console.log(index);
    console.log(pets[index]);
    setCartNum(cartNum => cartNum + 1);
    // cartAddDetail = { pet: pets[e.target.value], shopper: user }

    Axios({
      method: "POST",
      data: {
        pet: pets[index],
        shopper: user
      },
      withCredentials: true,
      url: "http://localhost:5000/cart/add"
    }).then((res) => {
      console.log(res.data);
      // if (res.data === "Successfully added") {
        // navigate("/");
        // window.open("http://localhost:3000/pets", "_self");
        // window.location.href = "http://localhost:3000/pets";
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
        return array.pet
      }))
    })
  }, [user]) // remove user dependence?

  return (
    <div className="">
      <h1>Header</h1>
      <div className="pet-selector-wrapper">
        <button className={"pet-selector-button " + (activePet === "All" ? "active-pet" : "")} onClick={() => setActivePet("All")} value="All">All</button>
        <button className={"pet-selector-button " + (activePet === "Cat" ? "active-pet" : "")} onClick={() => setActivePet("Cat")} value="Cat">Cats</button>
        <button className={"pet-selector-button " + (activePet === "Dog" ? "active-pet" : "")} onClick={() => setActivePet("Dog")} value="Dog">Dogs</button>
        <button className={"pet-selector-button " + (activePet === "Bird" ? "active-pet" : "")} onClick={() => setActivePet("Bird")} value="Bird">Birds</button>
      </div>

      <div className="pet-wrapper">
        <InfiniteScroll
          dataLength={pets.length}
          next={fetchMoreData}
          hasMore={maxLength > pets.length}
          loader={<h5>Loading...</h5>}
        >
          {pets.map((pet, index) => (
            <Pet key={index} index={index} pet={pet} petCountInCart={productList.filter(petInCart => petInCart === pet._id).length} addToCart={addToCart} user={user} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Pets;
