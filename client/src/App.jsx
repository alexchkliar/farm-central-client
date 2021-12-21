import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {
  const user = true;
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
