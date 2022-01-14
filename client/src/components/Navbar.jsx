import logo from '../img/farm-logo.png';
// import { Link } from "react-router-dom";
import '../App.css';
import '../css_components/navbar.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const Navigation = ({ user, cartNum, refresh}) => {

  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  }
  // console.log(user)
  return (
    <Navbar bg="dark" variant="dark"
      sticky="top" expand="sm" collapseOnSelect>
      <Navbar.Brand>
        FarmCentral
      </Navbar.Brand>

      <Navbar.Toggle className="coloring" />
      <Navbar.Collapse>
        <Nav>
          <NavDropdown title="Orders">
            <NavDropdown.Item href="/orders">My orders</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/sold">My sold items</NavDropdown.Item>
            <NavDropdown.Item href="/pets">My listings</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/pets">Browse pets</Nav.Link>
          { user ?
            ( <Nav.Link onClick={logout}>Logout</Nav.Link>) :
            (<> <Nav.Link href="/register">Sign up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link> </>)
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation;
