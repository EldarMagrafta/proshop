import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageComp from '../components/MessageComp.js'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { getOrderDetails } from '../actions/orderActions.js'
import LoaderComp from '../components/LoaderComp.js'
import NoticeComp from '../components/NoticeComp.js'
// import '../index.css'

const OrderScreen = () => {
  const params = useParams()
  const orderId = params.id

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, error, order } = orderDetails

//   useEffect(() => {
//     dispatch(getOrderDetails(orderId))
//   }, [])

// useEffect(() => {
//   if(!order || order._id !== orderId){
//       dispatch(getOrderDetails(orderId))
//   }
// }, [order, orderId, dispatch])

  useEffect(() => {
    if(!order || order._id !== orderId){
        dispatch(getOrderDetails(orderId))
    }
  }, [order, orderId])

  return (
    loading ? (
      <LoaderComp />
    ) : error ? (
      <MessageComp variant="danger">{error}</MessageComp>
    ) : (
      <>
        <h1>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
            <ListGroup.Item>
            <Row>
                <Col md={6}>
                <div>
                    <h2>Shipping to</h2>
                    <span style={{ fontSize: '1.2em' }}>
                    {order.user.name}<br />
                    {order.user.email}<br/><br/>
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}<br />
                    {order.shippingAddress.postalCode}<br />
                    {order.shippingAddress.country}<br />
                    </span>
                </div>
                </Col>

                <Col md={6}>
                    {!order.isPaid && <NoticeComp/>}
                </Col>

            </Row>
              <br/>
              {
                    order.isDelivered ? ( <MessageComp variant='success'> <div style={{ margin: 'auto', width: 'fit-content' }}>Delivered on: {order.deliveredAt}</div></MessageComp>) : 
                    (
                    <MessageComp variant='danger'>
                    <div style={{ margin: 'auto', width: 'fit-content' }}>Not Delivered</div>
                    </MessageComp>)
              }
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Payment Methods</h2>
                <p>
                {order.paymentMethod === 'PayPal' && <Image src="/images/paypal.png" alt="PayPal" className="paypal-img" />}
                </p>
                {
                order.isPaid ? <MessageComp variant='success'><div style={{ margin: 'auto', width: 'fit-content' }}>Paid at:{order.paidAt}</div></MessageComp> :
                        <MessageComp variant='danger'> <div style={{ margin: 'auto', width: 'fit-content' }}>Not Paid</div></MessageComp>
                }
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Items</h2>
                {
                order.orderItems.length === 0 ? (
                  <MessageComp>Your Order is empty</MessageComp>
                ) : (
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>
                          {/* <strong>Image</strong> */}
                        </Col>
                        <Col>
                          {/* <strong>Name</strong> */}
                        </Col>
                        <Col md={2}>
                          <strong>Amount</strong>
                        </Col>
                        <Col md={2}>
                          <strong>Price</strong>
                        </Col>
                        <Col md={2}>
                          <strong>Total</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={2}>
                            {item.qty}
                          </Col>
                          <Col md={2}>
                            ${item.price}
                          </Col>
                          <Col md={2}>
                            ${(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )
                }
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Items</strong>
                    </Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Shipping fee</strong>
                    </Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Tax</strong>
                    </Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                      <strong>Total</strong>
                    </Col>
                    <Col style={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                      ${order.totalPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  )
}

export default OrderScreen
