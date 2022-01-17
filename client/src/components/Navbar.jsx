import logo from '../img/farm-logo.png';
// import { Link } from "react-router-dom";
import '../App.css';
import '../css_components/navbar.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faCarrot } from '@fortawesome/free-solid-svg-icons'

const Navigation = ({ user, cartNum}) => {

  const logout = () => {
    window.open(`${process.env.URL_BASE_BACKEND}/auth/logout`, "_self");
  }
  // console.log(user === null)
  // console.log((typeof user.name) === "object")
  return (
    <Navbar bg="dark" variant="dark"
      sticky="top" expand="sm" collapseOnSelect >
      <Navbar.Brand href="/">
        <FontAwesomeIcon icon={faCarrot} className="font-awesome-icon" />
        <span> FarmCentral</span>
      </Navbar.Brand>

      <Navbar.Toggle className="coloring" />
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="/foods">Browse food</Nav.Link>
          <NavDropdown title="Orders">
            <NavDropdown.Item href={(user !== null) ? "/favorites" : "/login"}>My favorites</NavDropdown.Item>
            <NavDropdown.Item href={(user !== null) ? "/orders" : "/login"}>My orders</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={(user !== null) ? "/sold" : "/login"}>My sold items</NavDropdown.Item>
            <NavDropdown.Item href={(user !== null) ? "/foods" : "/login"}>My listings</NavDropdown.Item>
          </NavDropdown>
          { user ?
            (<> <Nav.Link href="/#">{(user.name ? user.name : user.name.givenName) + " profile"}</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link></>) :
            (<> <Nav.Link href="/register">Sign up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link> </>)
          }
          <i className="far fa-shopping-cart"></i>
          <Nav.Link href={(user !== null) ? "/cart" : "/login"}>
            <FontAwesomeIcon icon={faShoppingCart} className="font-awesome-icon" /> <span className="cart-number">({cartNum})</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;
