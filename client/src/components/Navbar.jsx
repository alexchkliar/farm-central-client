import { Link } from "react-router-dom";

const Navbar = ({user, cartNum}) => {

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  }
  // console.log(user)
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">Cool App</Link>
      </span>
      { user ? (
        <ul className="list">
          <li className="listItem">
            {/* <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
              /> */}
          </li>
          <li className="listItem">{user.username}</li>
          <li className="listItem" onClick={logout}>Logout</li>
        </ul>
        ) : ( <Link className="link" to="login">Login</Link> )
      }
      <Link className="link" to="/cart">Cart ({cartNum})</Link>
    </div>
  )
}

export default Navbar;
