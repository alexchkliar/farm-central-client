import './App.css';
import Navigation from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Foods from "./pages/Foods";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorite";
import Sales from "./pages/Sales";
import Register from "./pages/Register";
import NewFood from "./pages/NewFood";
import User from "./pages/User";
import CartCleanup from './pages/CartCleanup';
import Footer from './components/Footer';
import Listings from './pages/Listings';
import ListingUpdate from './pages/ListingUpdate';

function App() {
  const [user, setUser] = useState(null);
  const [cartNum, setCartNum] = useState(0);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/auth/login/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      },
    }).then((res) => {
      if (res.status === 200) return res.json();
      throw new Error("Authentication has failed")
    }).then(resObject => {

      // if Google account detected, authenticate differently
      if (resObject.user.displayName !== undefined) {
        fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/auth/specificUser`, {
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
          console.log("looking good")
          setUser(responseObject)
          console.log(user)
        }).catch((err) => {
          // console.log(err)
        })
      } else {
        setUser(resObject.user);
      }

    }).catch(err => {
      console.log(err)
    })

    fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/auth/usersList`).then(res => {
      return res.json()
    }).then((jsonRes) => {
      setUserList(jsonRes);
    }).catch((err) => {
      console.log(err);
    });

    return () => console.log("cleanup")

  }, [])

  useEffect(() => {
    const abortCont = new AbortController();
    const signal = abortCont.signal

    fetch(`${process.env.REACT_APP_URL_BASE_BACKEND}/cart/fetch`, { signal }
    ).then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return null
      setCartNum(jsonRes.cart_list.filter(function (item) {
        return item.shopper === user._id
      }).length)
    }).catch(err => {
      if (err.name === "AbortError") {
        // console.log("Fetch aborted")
      } else {
        throw err
      }
    })

    return () => { abortCont.abort() };

  }, [user])

  return (
    <BrowserRouter>
      <Navigation user={user} cartNum={cartNum} />
      <Routes>
        <Route>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart user={user} setCartNum={setCartNum} userList={userList} />} />
          <Route exact path="/foods/new" element={<NewFood user={user} setCartNum={setCartNum} userList={userList} />} />
          <Route exact path="/cart_cleanup" element={<CartCleanup user={user} />} />
          <Route exact path="/foods" element={<Foods user={user} setCartNum={setCartNum} userList={userList} />} />
          <Route exact path="/orders" element={<Orders user={user} userList={userList} />} />
          <Route exact path="/sold" element={<Sales user={user} userList={userList} />} />
          <Route exact path="/register" element={<Register user={user} />} />
          <Route exact path="/favorites" element={<Favorites user={user} />} />
          <Route exact path="/listings" element={<Listings user={user} userList={userList} />} />
          <Route exact path="/user/:id" element={<User user={user} />} />
          <Route exact path="/listing/:id/update" element={<ListingUpdate user={user} />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
