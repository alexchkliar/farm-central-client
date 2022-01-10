import Google from "../img/googpng.png"
import GitHub from "../img/githubpng.png"
import Facebook from "../img/fbpng.png"
import React, { useState } from "react";
import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Login = () => {

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self"); // can replace with window.location.href
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self"); // can replace with window.location.href
  };

  const register = (e) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url:"http://localhost:5000/auth/register"
    }).then((res) => console.log(res))
  }

  // const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
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
      if (res.data === "Successfully Authenticated"){
        console.log("redirecting");
        // navigate("/");
        // window.open("http://localhost:3000/pets", "_self");
        window.location.href = "http://localhost:3000/pets";
    }})
  }

  const getUser = (e) => {
    e.preventDefault();
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/auth/user"
    }).then((res) => console.log(res))
  }


  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a login method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook">
            <img src={Facebook} alt="" className="icon" onClick={facebook}/>
            Facebook
          </div>
          <div className="loginButton github">
            <img src={GitHub} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line"></div>
          <div className="or">OR</div>
        </div>
        <div className="right">
          <form>
            <input type="text" placeholder="Username" onChange={e => setRegisterUsername(e.target.value) }/>
            <input type="text" placeholder="Password" onChange={e => setRegisterPassword(e.target.value) } />
            <button className="submit" onClick={register}>Register</button>
          </form>
          <br />
          <form>
            <input type="text" placeholder="Username" onChange={e => setLoginUsername(e.target.value) } />
            <input type="text" placeholder="Password" onChange={e => setLoginPassword(e.target.value) } />
            <button className="submit" onClick={login}>Login</button>
          </form>

          <h2>get user</h2>
          <button className="submit" onClick={getUser}>Get user</button>

        </div>
      </div>
    </div>
  )
}

export default Login
