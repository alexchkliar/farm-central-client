import Google from "../img/googpng.png"
import React, { useState } from "react";
import Axios from 'axios';
import '../css_components/authentication.css';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
// import dotenv from 'dotenv'
// import path from 'path'

// import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [validation, setValidation] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertClass, setAlertClass] = useState("");

  const google = () => {
    if (window.location.hostname === "localhost") {
      window.open(`http://localhost:5000/api/auth/google`, "_self"); // can replace with window.location.href
    } else {
      window.open(`${process.env.REACT_APP_URL_BASE_BACKEND}/auth/google`, "_self"); // can replace with window.location.href
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: username,
        password: password
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_URL_BASE_BACKEND}/auth/login` // switched for deployment debugging
    }).then((res) => {
      if (res.data === "Successfully Authenticated") {
        window.location.href = `/foods`;
      } else {
        setAlertClass("alert alert-danger")
        setValidation("Incorrect username or password.")
      }
    })
  };

  return (
    <div className="login my-5">
      <h1 className="login-title mb-4">Sign in</h1>
      <div className="google" md="4" onClick={google}>
        <div className="left-google"><img src={Google} alt="" className="icon" /></div>
        <div className="right-google w-100">Sign in with Google</div>
      </div>
      <div className="separator-line"></div>

      <Form noValidate onSubmit={handleSubmit}>
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
                onChange={e => setUsername(e.target.value)}
              />
              <div className="mt-3 w-100" role="alert"> {} </div>
              {/* <Form.Control.Feedback type="invalid">
                Please input a valid username. {usernameValidation}
              </Form.Control.Feedback> */}
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
              onChange={e => setPassword(e.target.value)}
            />
            <div className={alertClass + " mt-3 w-100"} role="alert"> {validation} </div>
            {/* <Form.Control.Feedback type="invalid">
              Please provide a valid password. {passwordValidation}
            </Form.Control.Feedback> */}
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
        <Button type="submit" className="w-100" >Sign in</Button>
      </Form>
      <br />
      <div className="sign-in-prompt">Don't have an account? <a href="/register">Register now!</a></div>
    </div>
  )
}

export default Login
