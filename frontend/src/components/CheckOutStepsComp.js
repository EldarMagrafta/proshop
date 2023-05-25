import React from 'react'
import { Nav } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const CheckOutStepsComp = (props) => {
    
    const { step1, step2, step3, step4 } = props;
    const pathname = window.location.pathname;

  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {
            step1 ? (<LinkContainer to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                     </LinkContainer>) 
                     :
                     <Nav.Link disabled>Sign In</Nav.Link>
            }
        </Nav.Item>

        <Nav.Item>
            {
            step2 ? (<LinkContainer to='/shipping'>
                          <Nav.Link>
                            {pathname === '/shipping' ? (<div style={{ fontSize: '1.5em' }}>Shipping</div>) : ('Shipping')}
                        </Nav.Link>
                     </LinkContainer>) 
                     :
                     <Nav.Link disabled>Shipping</Nav.Link>
            }
        </Nav.Item>

        {/* <Nav.Item>
            {
            step3 ? (<LinkContainer to='/payment'>
                        <Nav.Link>
                            {pathname === '/payment' ? (<div style={{ fontSize: '1.5em' }}>Payment</div>) : ('Payment')}
                        </Nav.Link>
                     </LinkContainer>) 
                     :
                     <Nav.Link disabled>Payment</Nav.Link>
            }
        </Nav.Item> */}

        <Nav.Item>
            {
            step4 ? (<LinkContainer to='/placeorder'>
                        <Nav.Link>
                            {pathname === '/placeorder' ? (<div style={{ fontSize: '1.5em' }}>Place Order</div>) : ('Place Order')}
                        </Nav.Link>
                     </LinkContainer>) 
                     :
                     <Nav.Link disabled>Place Order</Nav.Link>
            }
        </Nav.Item>



    </Nav>
  )
}

export default CheckOutStepsComp