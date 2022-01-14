import Google from "../img/googpng.png"
import React, { useState } from "react";
import Axios from 'axios';
import '../css_components/authentication.css';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self"); // can replace with window.location.href
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:5000/auth/login"
    }).then((res) => {
      console.log(res.data);
      if (res.data === "Successfully Authenticated") {
        console.log("redirecting");
        // navigate("/");
        // window.open("http://localhost:3000/pets", "_self");
        window.location.href = "http://localhost:3000/pets";
      }
    })
  };

  return (
    <div className="login">

      <h1 className="loginTitle">Choose a login method</h1>

      <div className="loginButton google" md="4" onClick={google}>
        <div className="left-google"><img src={Google} alt="" className="icon" /></div>
        <div className="right-google w-100">Sign in with Google</div>
      </div>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                onChange={e => setLoginUsername(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please input a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom05">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={e => setLoginPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        {/* <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group> */}
        <Button type="submit" className="w-100" >Login</Button>
      </Form>
    </div>
  )
}

export default Login
