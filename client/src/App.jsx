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

function App() {
  const [user, setUser] = useState(null);
  const [cartNum, setCartNum] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        },
      }).then((response) => {
        if (response.status===200) return response.json();
        throw new Error("Authentication has failed")
      }).then(resObject => {
        setUser(resObject.user);
      }).catch(err => {
      })
    };
    getUser();
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
      <div>
        <Navigation user={user} cartNum={cartNum} />
        <Routes>
          <Route>
            <Route path ="/" element={<Home />} />
            <Route path="/cart" element={<Cart user={user} setCartNum={setCartNum} />} />
            <Route path="/cart_cleanup" element={<CartCleanup user={user} />}/>
            <Route path="/foods" element={<Foods user={user} setCartNum={setCartNum} />} />
            <Route path="/orders" element={<Orders user={user} />} />
            <Route path="/sold" element={<Sales user={user} />} />
            <Route path="/register" element={<Register user={user} />} />
            <Route
              path ="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route path="/post/:id" element={user ? <Post /> : <Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
