import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckOutStepsComp from '../components/CheckOutStepsComp.js'
import MessageComp from '../components/MessageComp.js'
import { addToCart,removeFromCart } from '../actions/cartActions'
import { createOrder } from '../actions/orderActions.js'
import '../index.css'

 



const PlaceOrderScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const paymentMethod = cart.paymentMethod

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const addDecimals = (num) =>{
        return (Math.round(num * 100)/100).toFixed(2)
    }

    //calculate prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc,item)=> acc + item.qty * item.price, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice >= 100 ? 0 : addDecimals(9.90))
    cart.taxPrice = addDecimals(Number(0.17 * cart.itemsPrice))
    cart.totalPrice = addDecimals(Number(cart.itemsPrice) +  Number(cart.shippingPrice) + Number(cart.taxPrice))

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success, error} = orderCreate

    useEffect(() =>{
        if(success){
            navigate(`/order/${order._id}`)
        }
    }, [navigate, success])

    const placeOrderHandler = () =>{
        const orderInfo = {
            orderItems : cart.cartItems, //list of JSONS
            shippingAddress: cart.shippingAddress, //JSON
            paymentMethod: paymentMethod, //String
            itemsPrice: cart.itemsPrice, //String
            shippingPrice: cart.shippingPrice, //String
            taxPrice: cart.taxPrice, //String
            totalPrice: cart.totalPrice //String
        }
        dispatch(createOrder(orderInfo))
    }



  return (
    <div>
        <CheckOutStepsComp step1 = {userInfo ? false : true} step2={true} step3={true} step4={true}/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>

                    <ListGroup.Item>
                        <h2>Shipping to</h2>
                        <span style={{ fontSize: '1.2em' }}>
                            {cart.shippingAddress.address}<br/>
                            {cart.shippingAddress.city}<br/>
                            {cart.shippingAddress.postalCode}<br/>
                            {cart.shippingAddress.country}<br/>
                        </span>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Methods</h2>
                        {
                        paymentMethod === 'PayPal' && <Image src= "/images/paypal.png" alt='PayPal' className='paypal-img' />
                        }
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {
                            cart.cartItems.length === 0 ? <MessageComp>Your cart is empty</MessageComp> :
                                                         (<ListGroup variant='flush'>
                                                            {
                                                                cart.cartItems.map((item,index) => (
                                                                    <ListGroup.Item key={index}>
                                                                        <Row>
                                                                            <Col md={2}>
                                                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                                            </Col>

                                                                            <Col>
                                                                                <Link to={`/product/${item.product}`}>
                                                                                    {item.name}
                                                                                </Link>
                                                                            </Col>

                                                                            <Col md={4}>
                                                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                                            </Col>

                                                                            <Col md={2}>
                                                                                <Form.Control as='select' value={item.qty} onChange={(e) => {dispatch(addToCart(item.product, Number(e.target.value)))}}>
                                                                                    {
                                                                                    [...Array(item.countInStock)].map((x, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)
                                                                                    }
                                                                               </Form.Control> 
                                                                            </Col>

                                                                            <Col md={2}>
                                                                                <Button type = "button" title="Remove from cart" variant="light" onClick={() => dispatch(removeFromCart(item.product))}>
                                                                                <i className='fas fa-trash'></i>
                                                                                </Button>
                                                                            </Col>

                                                                        </Row>
                                                                    </ListGroup.Item>
                                                                ))
                                                            }
                                                         </ListGroup>)   
                        
                        }
                      
                    </ListGroup.Item>

                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping fee</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Total</Col>
                                <Col style={{ fontSize: '1.5em', fontWeight: 'bold' }}> ${cart.totalPrice} </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <MessageComp variant='danger'>{error}</MessageComp>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type = 'button' className='btn-block' disabled={cart.cartItems.length===0} onClick={placeOrderHandler}>Place Order</Button>
                        </ListGroup.Item>

                        
                    </ListGroup>
                </Card>
            </Col>


        </Row>
    </div>
  )
}

export default PlaceOrderScreen