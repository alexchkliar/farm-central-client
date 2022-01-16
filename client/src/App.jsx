import './App.css';
import Navigation from './components/Navbar';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Foods from "./pages/Foods";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Sales from "./pages/Sales";
import Register from "./pages/Register";
import CartCleanup from './pages/CartCleanup';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);
  const [cartNum, setCartNum] = useState(0);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
    }).then((res) => {
      if (res.status===200) return res.json();
      throw new Error("Authentication has failed")
    }).then(resObject => {

      // if Google account detected, authenticate differently
      // console.log(resObject)
      if (resObject.user.displayName !== undefined) {
        // console.log("hey")
        fetch("http://localhost:5000/auth/specificUser", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
          },
        }).then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Authentication has failed")
        }).then(responseObject => {
          setUser(responseObject)
        }).catch((err) => {
          console.log(err)
        })
      } else {
        setUser(resObject.user);
      }

      // console.log(resObject.user.displayName !== undefined)

    }).catch(err => {
      console.log(err)
    })

    console.log(user)

    fetch("http://localhost:5000/auth/usersList").then(res => {
      return res.json()
    }).then((jsonRes) => {
      setUserList(jsonRes);
    }).catch((err) => {
      console.log(err);
    });

  }, [])

  useEffect(() => {
    fetch("http://localhost:5000/cart/fetch", {
      // method: "GET",
      // body: {
      //   user: user,
      // }
      // credentials: "include",
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Credentials": true
      // },
    }).then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return null
      setCartNum(jsonRes.cart_list.filter(function (item) {
        return item.shopper === user._id
      }).length)
    })
  }, [user]) // remove user dependence?

  return (
    <BrowserRouter>
        <Navigation user={user} cartNum={cartNum} />
        <Routes>
          <Route>
            <Route path ="/" element={<Home />} />
            <Route path="/cart" element={<Cart user={user} setCartNum={setCartNum} userList={userList}/>} />
            <Route path="/cart_cleanup" element={<CartCleanup user={user} />}/>
            <Route path="/foods" element={<Foods user={user} setCartNum={setCartNum} userList={userList}/>} />
            <Route path="/orders" element={<Orders user={user} userList={userList} />} />
            <Route path="/sold" element={<Sales user={user} userList={userList} />} />
            <Route path="/register" element={<Register user={user} />} />
            <Route
              path ="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route path="/post/:id" element={user ? <Post /> : <Navigate to="/" />} />
          </Route>
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
