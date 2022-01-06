import React, { useState, useEffect } from "react";

function Pets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/pets").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes =>
      // console.log(jsonRes.pet_list)
      setPets(jsonRes.pet_list)
    )
  })

  return (
    <div>
      <h1>test</h1>
      {pets.map(pet =>
        <ul key={pet._id}>
          <li><img width="250" height="250" src={pet.photo} alt="" ></img></li>
          <li>{pet.name}</li>
          <li>{pet.species}</li>
          <li>{pet.breed}</li>
          <li>{pet.birthDate}</li>
        </ul>
      )}
    </div>
  )
}

export default Pets;
