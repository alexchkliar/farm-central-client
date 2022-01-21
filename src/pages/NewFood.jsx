import React, { useState } from "react";
import Axios from 'axios';
// import '../css_components/authentication.css';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';

const NewFood = () => {

  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [alertClass, setAlertClass] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // const [photo, setPhoto] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      name === "" ||
      units === "" ||
      category === "" ||
      location === "" ||
      quantity === "" ||
      price === "" ||
      url === ""
    ) {
      setAlertClass("alert alert-danger")
      setAlertMessage("All fields must be filled out.")
    } else {
      Axios({
        method: "POST",
        data: {
          name: name,
          units: units,
          category: category,
          location: location,
          quantity: parseFloat(quantity),
          price: parseFloat(price),
          photo: url,
        },
        withCredentials: true,
        url: `${process.env.REACT_APP_URL_BASE_BACKEND}/foods/new`
      }).then((res) => {
        if (res.data === "New food saved") {
          window.location.href = `${process.env.REACT_APP_URL_BASE_CLIENT}/foods`;
        }
      }).catch(err => {
        console.log(err)
      })
    }

  };

  return (
    <div className="login mt-5">
      <h1 className="login-title mb-4">List your food</h1>
      <Form noValidate onSubmit={handleSubmit}>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              required
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
        </Row>

        <label>Category</label>
        <Row className="mb-3">
          <Form.Select as={Col} onChange={e => setCategory(e.target.value)}>
            <option value=""></option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Your location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              required
              onChange={e => setLocation(e.target.value)}
            />
          </Form.Group>
        </Row>


        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Measurement units per item</Form.Label>
            <Form.Control
              type="text"
              placeholder="Units"
              required
              onChange={e => setUnits(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="0"
              placeholder="Quantity"
              required
              onChange={e => setQuantity(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Price per unit</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price"
              min="0"
              step=".01"
              required
              onChange={e => setPrice(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Photo URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="URL"
              required
              onChange={e => setUrl(e.target.value)}
            />
          </Form.Group>
        </Row>
        <div className={alertClass + " mt-3 w-100"} role="alert"> {alertMessage} </div>


        <Button type="submit" className="w-100" >List food</Button>
      </Form>
    </div>
  )
}

export default NewFood
