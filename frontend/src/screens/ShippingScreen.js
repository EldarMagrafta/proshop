
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainerComp from '../components/FormContainerComp.js'
import CheckOutStepsComp from '../components/CheckOutStepsComp.js'
import { saveShippingAddress } from '../actions/cartActions.js'


const ShippingScreen = () => {

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address , city, postalCode, country}))
    navigate('/placeorder')

  }


  return (

    <FormContainerComp>

      <CheckOutStepsComp step1={userInfo ? false : true} step2={true} 
      step3={shippingAddress !== null && shippingAddress.address}
      step4={shippingAddress !== null && shippingAddress.address}/>

      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' placeholder='Enter address' value={address} required
          onChange={(e) => setAddress(e.target.value)}>
          </Form.Control>
        </Form.Group><br/>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control type='text' placeholder='Enter city' value={city} required
          onChange={(e) => setCity(e.target.value)}>
          </Form.Control>
        </Form.Group><br/>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control type='text' placeholder='Enter postal code' value={postalCode} required
          onChange={(e) => setPostalCode(e.target.value)}>
          </Form.Control>
        </Form.Group><br/>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control type='text' placeholder='Enter country' value={country} required
          onChange={(e) => setCountry(e.target.value)}>
          </Form.Control>
        </Form.Group><br/>

        <Button type='submit' variant='primary'>Save & Continue</Button>

      </Form>
    </FormContainerComp>
  )
}

export default ShippingScreen