import React, { useState, useEffect, useRef, useCallback } from "react";
// import useBookSearch from '../functions/useBookSearch'
import InfiniteScroll from 'react-infinite-scroll-component';
// import axios from 'axios'

function Pets() {
  const [pets, setPets] = useState([]);
  const [activePet, setActivePet] = useState("All");
  const [items, setItems] = useState([]);
  const [maxLength, setMaxLength] = useState(0);

  // console.log(Array.from({ length: 20 }))

  // fetch("http://localhost:5000/pets").then(res => {
  //   if (res.ok) {
  //     return res.json()
  //   }
  // })

  // axios({
  //   url: "http://localhost:5000/pets",
  //   method: "GET",
  //   // data: {
  //   //   username: registerUsername,
  //   //   password: registerPassword
  //   // },
  //   // withCredentials: true,
  // }).then((res) =>
  //   console.log(res.data.pet_list.slice(0, 10))
  // )

  useEffect(() => {
    fetch("http://localhost:5000/pets").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then((jsonRes) =>
      setItems(jsonRes.pet_list.filter(function (pet) {
        return pet.species === activePet || activePet === "All"
      }).slice(0, 10))
    )
  }, [activePet])

  useEffect(() => {
    fetch("http://localhost:5000/pets").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then((jsonRes) =>
      setMaxLength(jsonRes.pet_list.length)
    )
  }, [])

  // const [pageNumber, setPageNumber] = useState(1)

  // const {
  //   books,
  //   hasMore,
  //   loading,
  //   error
  // } = useBookSearch('Cars', pageNumber)

  // const observer = useRef()

  // const lastBookElementRef = useCallback(node => {
  //   if (loading) return
  //   if (observer.current) observer.current.disconnect()
  //   observer.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       setPageNumber(prevPageNumber => prevPageNumber + 1)
  //     }
  //   })
  //   if (node) observer.current.observe(node)
  // }, [loading, hasMore])
  const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };


  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    // setTimeout(() => {
    //   setItems(items.concat(Array.from({ length: 20 })));
    // }, 1500);

    fetch("http://localhost:5000/pets").then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then((jsonRes) =>
      setItems(items.concat(jsonRes.pet_list.filter(function (pet) {
        return pet.species === activePet || activePet === "All"
      }).slice(items.length, items.length + 10)))
    )

  };

  return (
    <div>
      <h1>test</h1>

      <button onClick={() => setActivePet("Cat")} value="Cat">Cats</button>
      <button onClick={() => setActivePet("Dog")} value="Dog">Dogs</button>
      <button onClick={() => setActivePet("Bird")} value="Bird">Birds</button>

      {/* {pets.map(pet =>
        <ul key={pet._id}>
          <li><img width="250" height="250" src={pet.photo} alt="" ></img></li>
          <li>{pet.name}</li>
          <li>{pet.species}</li>
          <li>{pet.breed}</li>
          <li>{pet.birthDate}</li>
        </ul>
      )} */}

      <div>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={maxLength > items.length}
          loader={<h5>Loading...</h5>}
        >
          {items.map((item, index) => (
            <ul key={index}>
              <li><img width="250" height="250" src={item.photo} alt="" /></li>
              <li>{item.name}</li>
              <li>{item.species}</li>
              <li>{item.breed}</li>
              <li>{item.birthDate}</li>
            </ul>
          ))}
        </InfiniteScroll>
      </div>

      {/* {books.map((book, index) => {
        if (books.length === index + 1) {
          return <div ref={lastBookElementRef} key={book}>{book}</div>
        } else {
          return <div key={book}>{book}</div>
        }
      })} */}
      {/* <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div> */}

    </div>
  )
}

export default Pets;
