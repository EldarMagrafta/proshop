
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainerComp from '../components/FormContainerComp.js'
import CheckOutStepsComp from '../components/CheckOutStepsComp.js'
import {savePaymentMethod} from '../actions/cartActions.js'


const PaymentScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  if(!shippingAddress){
    navigate('/shipping')
  }

//   const userLogin = useSelector(state => state.userLogin)
//   const {userInfo} = userLogin

//   useEffect(() => {
//     if (!userInfo) {
//       navigate('/login')
//     }
//   }, [userInfo, navigate])


  const [paymentMethod, setPaymentMethod] = useState('PayPal')


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }


  return (
    <FormContainerComp>
      <CheckOutStepsComp step1={true} step2={true} step3={true} />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              className='my-2'
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}>
            </Form.Check>
            {/* <Form.Check
              className='my-2'
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}>
            </Form.Check> */}
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainerComp>
  );
};

export default PaymentScreen;