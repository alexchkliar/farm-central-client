import React, { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import '../css_components/pets.css';
import Axios from 'axios';

function Pets({ currentCartNum, updateCartNum, user }) {
  const [activePet, setActivePet] = useState("All");
  const [pets, setPets] = useState([]);
  const [maxLength, setMaxLength] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/pets").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then((jsonRes) => {
      const outputList = jsonRes.pet_list.filter(function (pet) {
        return pet.species === activePet || activePet === "All"
      })
      setMaxLength(outputList.length)
      setPets(outputList.slice(0, 10))
      }
    )
  }, [activePet])

  const fetchMoreData = () => {
    fetch("http://localhost:5000/pets").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then((jsonRes) =>
      setPets(pets.concat(jsonRes.pet_list.filter(function (pet) {
        return pet.species === activePet || activePet === "All"
      }).slice(pets.length, pets.length + 10)))
    )
  };

  const addToCart = (e) => {
    if (user === null) window.location.href = "http://localhost:3000/login";
    // console.log(user);
    // console.log(pets[e.target.value]);
    // updateCartNum(currentCartNum + 1);
    // cartAddDetail = { pet: pets[e.target.value], shopper: user }

    Axios({
      method: "POST",
      data: {
        pet: pets[e.target.value],
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

  return (
    <div>
      <h1>Header</h1>

      <button onClick={() => setActivePet("All")} value="All">All</button>
      <button onClick={() => setActivePet("Cat")} value="Cat">Cats</button>
      <button onClick={() => setActivePet("Dog")} value="Dog">Dogs</button>
      <button onClick={() => setActivePet("Bird")} value="Bird">Birds</button>

      <div>
        <InfiniteScroll
          dataLength={pets.length}
          next={fetchMoreData}
          hasMore={maxLength > pets.length}
          loader={<h5>Loading...</h5>}
        >
          {pets.map((pet, index) => (
            <ul key={index}>
              <li><img width="250" height="250" src={pet.photo} alt="" /></li>
              <li>{pet.name}</li>
              <li>{pet.species}</li>
              <li>{pet.breed}</li>
              <li>{pet.seller}</li>
              <li>{pet.quantity}</li>
              <button onClick={(e) => addToCart(e)} value={index}>Add to cart</button>
            </ul>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Pets;
