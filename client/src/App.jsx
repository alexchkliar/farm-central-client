import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Pets from "./pages/Pets";
import Cart from "./pages/Cart";

function App() {
  const [user, setUser] = useState(null);
  const [cartNum, setCartNum] = useState(0);
  const [forceRender, setForceRender] = useState(0);

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

  function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    fetch("http://localhost:5000/cart/fetch").then(res => {
      return res.json()
    }).then((jsonRes) => {
      if (user === null) return null
      setCartNum(jsonRes.cart_list.filter(function (item) {
        return item.shopper === user._id
      }).length)
    })
  }, [user])

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} cartNum={cartNum} forceRender={forceRender} />
        <Routes>
          <Route>
            <Route path ="/" element={<Home />} />
            <Route path ="/cart" element={<Cart />} />
            <Route path="/pets" element={<Pets user={user} forceUpdate={forceUpdate} currentCartNum={cartNum} />} />
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
