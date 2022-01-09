import React, { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

function Pets() {
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

  return (
    <div>
      <h1>Header</h1>

      <button onClick={() => setActivePet("Cat")} value="Cat">Cats</button>
      <button onClick={() => setActivePet("Dog")} value="Dog">Dogs</button>
      <button onClick={() => setActivePet("Bird")} value="Bird">Birds</button>

      <div className="scroll-wrap">
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
              <li>{pet.birthDate}</li>
            </ul>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Pets;
