import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../css_components/listings.css';

const Listing = ({ food, handleClick, setMessageClass, setDeteledItem }) => {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    console.log("test this")
  }, [modalShow])

  function handleDelete(itemName) {
    handleClick(food)
    setModalShow(current => false)
    displayMessage(itemName)
  }


  function displayMessage(itemName) {
    setDeteledItem(itemName)
    setMessageClass("message-active")
    setTimeout(() => {
      setMessageClass("message-inactive")},
      2000
  )}

  return (
    <div className="food-card">
      <Modal
        show={modalShow}
        food={food}
        // onHide={() => setModalShow(false)}
        // handleclick={handleClick}

        // {..., show, show}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={() => setModalShow(current => false)}>
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure you want to delete this listing?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          <p>
            This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleDelete(food.name)}> Yes </Button>
          <Button onClick={() => setModalShow(current => false)}> No </Button>
        </Modal.Footer>
      </Modal>

      <ul className="food-ul">
        <img className="food-card-img" src={food.category === "Vegetable" ? "carrot-solid.svg" : (food.category === "Fruit" ? "apple-alt-solid.svg" : "egg-solid.svg")} alt={food.name} />
        <div className="food-cart-bottom-container">

          <div className="food-card-text-container">
            <div className="food-card-left">
              <li className="list-food-name">{food.name}</li>
              <li className="list-food-units">{food.units}</li>
              <li className="list-food-rating">
                <FontAwesomeIcon icon={farStar} className="font-awesome-icon star" />
                <span> </span>
                {food.rating.toFixed(1)}
              </li>
            </div>

            <div className="food-card-right">
              <li className="list-food-price">${food.price.toFixed(2)}</li>
              <li className="list-food-available">{(food.quantity > 0) ? (food.quantity + " available") : "Sold out"}</li>
              <li className="list-food-breed"> <span>&nbsp;</span> </li>
            </div>
          </div>
          <div className="update-delete-wrapper">
            <Button variant="primary" href={"/listing/" + food._id + "/update/"} className="card-update-button"> Update </Button>
            <Button variant="primary" onClick={() => setModalShow(current => true)} className="card-delete-button"> Delete </Button>

            {/* <a className="update-text" href={"/listing/" + food._id + "/update/"}>UPDATE</a> */}
            {/* <div className="delete-text" onClick={() => deleteListing()}>DELETE</div> */}
          </div>
        </div>
      </ul>
    </div>
  )
}

export default Listing;
