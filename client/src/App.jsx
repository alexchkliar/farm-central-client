import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

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
        console.log("response logged")
        console.log(response)
        if (response.status===200) return response.json();
        throw new Error("Authentication has failed")
      }).then(resObject => {
        console.log("setting user")
        console.log(resObject.user)
        setUser(resObject.user);
        // console.log('we are here');
        // console.log(resObject.user);
      }).catch(err => {
        throw err;
      })
    };
    console.log("getUser being run")
    getUser();
  }, [])

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route>
            <Route path ="/" element={<Home />} />
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
