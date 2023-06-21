import React from 'react'
import { Route } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Container, Nav, Navbar , NavDropdown} from 'react-bootstrap'
import { logout } from '../actions/userActions.js'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import SearchBoxComp from './SearchBoxComp.js'






function HeaderComp() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {cartItems} = useSelector(state => state.cart)
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout(navigate)) // Pass the navigate function to the logout action creator
  }

  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>


        <LinkContainer to='/'>
          <Navbar.Brand className="d-flex flex-column align-items-center">
            <img src={logo} alt='Logo' style={{ borderRadius: '100%', width: '50px', height: 'auto' }} className='logo-img' />
            <span style={{ marginTop: '0.5rem' }}>Magrafta Mobile</span>
          </Navbar.Brand>
        </LinkContainer>

        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBoxComp/>
          <Nav className="ml-auto">

            <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart 
                  {/* show the number of items in the cart */}
                  {cartItems.length > 0 &&
                    ` (${cartItems.reduce((acc, item) => acc + Number(item.qty),0)})`}
                </Nav.Link>
            </LinkContainer>
            {userInfo ?
              (<NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item><i className="fas fa-user"></i> Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={()=> logoutHandler()}><i className="fas fa-sign-out"></i> Logout</NavDropdown.Item>
               </NavDropdown>
            )
            : 
            (<LinkContainer to='/login'>
                  <Nav.Link><i className='fas fa-user'></i> Sign In </Nav.Link>
               </LinkContainer>)}
            {
              userInfo && userInfo.isAdmin && 
              (<NavDropdown title='Admin Menu' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                     <NavDropdown.Item><i className="fas fa-user"></i> Users </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                     <NavDropdown.Item><i className="fas fa-tags"></i> Products </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                     <NavDropdown.Item><i className="fas fa-table"></i> Orders </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )
            }
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1"> Action </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"> Another action </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"> Something </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4"> Separated link </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
    </header>
  );
}

export default HeaderComp;
