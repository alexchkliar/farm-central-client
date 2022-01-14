import Google from "../img/googpng.png"
import React, { useState } from "react";
import Axios from 'axios';
import '../css_components/authentication.css';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom';



const Login = () => {

  const [validated, setValidated] = useState(false);
  const [usernameValidation, setUsernameValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self"); // can replace with window.location.href
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const usernameRegex = /^[a-zA-Z0-9]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/

    const minLength = 8
    const maxLength = 20

    console.log(username)
    let usernameErrorMesage = ""
    let passwordErrorMesage = ""

    if (username === "" ) {
      usernameErrorMesage += ("Username is empty. ")
    }

    if (username.length < minLength || username.length > maxLength) {
      usernameErrorMesage += (`Username must be between ${minLength} and ${maxLength} characters long. `)
    }

    if (!usernameRegex.test(username)) {
      usernameErrorMesage += ('Username must only comprise alphanumeric characters. ')
    }

    if (password === "") {
      passwordErrorMesage += ("Password is empty. ")
    }

    if (password.length < minLength || passwordErrorMesage.length > maxLength) {
      passwordErrorMesage += (`Password must be between ${minLength} and ${maxLength} characters long. `)
    }

    if (!passwordRegex.test(password)) {
      passwordErrorMesage += ('Password must have at least one uppercase letter, one lowercase letter, one number and one special character among @$!%*?&. ')
    }

    console.log(usernameErrorMesage)
    console.log(passwordErrorMesage)

    if (usernameErrorMesage === "") {
      Axios({
        method: "POST",
        data: {
          username: username,
          password: password
        },
        withCredentials: true,
        url: "http://localhost:5000/auth/register"
      }).then((res) => {
        if (res.data === "User Created") {
          // window.location.href = "http://localhost:3000/pets";

        }
        if (res.data === "User Already Exists") {
          console.log("Username already exists.")
          setUsernameValidation("Username already exists.")
          event.stopPropagation();
        }
       // setValidated(true);
      }).catch(err => {
        console.log(err)
      })
    }
    setUsernameValidation(usernameErrorMesage)
    setPasswordValidation(passwordErrorMesage)
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
                onChange={e => setUsername(e.target.value)}
              />
              <div className="validation-message"> {usernameValidation} </div>
              <Form.Control.Feedback type="invalid">
                Please input a valid username. {usernameValidation}
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
              onChange={e => setPassword(e.target.value)}
            />
            <div className="validation-message"> {passwordValidation} </div>
            <Form.Control.Feedback type="invalid">
              Please provide a valid password. {passwordValidation}
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
        <Button type="submit" className="w-100" >Register</Button>
      </Form>
    </div>
  )
}

export default Login
