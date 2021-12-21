import { Link } from "react-router-dom";

const Navbar = ({user}) => {
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">Lama App</Link>
      </span>
      { user ? (
        <ul className="list">
        <li className="listItem">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Big_%26_Small_Pumkins.JPG"
            alt=""
            className="avatar"
            />
        </li>
        <li className="listItem">John Doe</li>
        <li className="listItem">Logout</li>
      </ul>
      ) : (<Link className="link" to="login">Login</Link>)
    }
    </div>
  )
}

export default Navbar;
