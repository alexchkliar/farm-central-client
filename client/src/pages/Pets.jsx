import React, { useState, useEffect, useRef, useCallback } from "react";
import useBookSearch from '../functions/useBookSearch'

function Pets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/pets").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then((jsonRes) =>
      setPets(jsonRes.pet_list)
    )
  }, [])

  useRef()

  function selectPets(e) {
    const animal = e.target.value
    fetch("http://localhost:5000/pets").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then((jsonRes) =>
      setPets(jsonRes.pet_list.filter(function (item) {
        return item.species === animal
      }))
    )
  };

  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <div>
      <h1>test</h1>

      <button onClick={selectPets} value="Cat">Cats</button>
      <button onClick={selectPets} value="Dog">Dogs</button>
      <button onClick={selectPets} value="Bird">Birds</button>

      {pets.map(pet =>
        <ul key={pet._id}>
          <li><img width="250" height="250" src={pet.photo} alt="" ></img></li>
          <li>{pet.name}</li>
          <li>{pet.species}</li>
          <li>{pet.breed}</li>
          <li>{pet.birthDate}</li>
        </ul>
      )}

      <input type="text" value={query} onChange={handleSearch}></input>
      {books.map((book, index) => {
        if (books.length === index + 1) {
          return <div ref={lastBookElementRef} key={book}>{book}</div>
        } else {
          return <div key={book}>{book}</div>
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>

    </div>
  )
}

export default Pets;
