import React, {useEffect} from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { Row, Col , ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import MessageComp from '../components/MessageComp'
import { addToCart , removeFromCart } from '../actions/cartActions'
import CheckOutStepsComp from '../components/CheckOutStepsComp'


const CartScreen = () => {

    // const params = useParams();
    // const productId = params.id;

    // const location = useLocation();
    // const qty = new URLSearchParams(location.search).get('qty');

    const cart = useSelector(state => state.cart);
    const { cartItems, shippingAddress } = cart

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let totalQty = 0;
    for (let i = 0; i < cartItems.length; i++) {
        totalQty += Number(cartItems[i].qty);
    }


    const navigate = useNavigate();

    const dispatch = useDispatch();

    const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id))
    }

    const checkoutHandler = ()=>{
      navigate('/login?redirect=/shipping');
    }




 
    // useEffect(()=> {
    //   if(productId){
    //     dispatch(addToCart(productId , qty))
    //   }
    // }, [dispatch , productId , qty])



      
    return (
      <>
        <CheckOutStepsComp step1 = {userInfo ? false : true}
            step2={
            shippingAddress !== null && shippingAddress.address && userInfo
            }

            step3={
              shippingAddress !== null && shippingAddress.address && userInfo
            }

            step4={
              shippingAddress !== null && shippingAddress.address && userInfo
            }
          />

        <Row>
          <Col md={8}>
            <h1>Shopping Cart!!</h1>
            {
              cartItems.length === 0 ? <MessageComp>Your cart is empty <Link to = "/">Go Back</Link></MessageComp> :
                                      (
                                        <ListGroup variant = "flush">
                                          {
                                          //each "item" is a object with the fields: product, name, image, price, countInStock and qty
                                          cartItems.map(item =>
                                            <ListGroup.Item key={item.product}>
                                              <Row>
                                                <Col md={3}>
                                                  <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>

                                                <Col md={3}>
                                                  <Link to={`/product/${item.product}`}>{item.name} </Link>
                                                </Col>

                                                <Col md={2}>
                                                  ${item.price}
                                                </Col>

                                                {/* CHANGE THE QUANTITY OF SELECTED PRODUCT */}
                                                <Col md={2}>
                                                  {/* here item.product is actually the mongoDB id of the item */}
                                                  <Form.Control as='select' value={item.qty} title="change amount" onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}> 
                                                  {
                                                    [...Array(item.countInStock)].map((x, i) => 
                                                      <option key={i + 1} value={i + 1}>{i + 1}</option>)
                                                  }
                                                  </Form.Control> 
                                                </Col>

                                                <Col md={2}>
                                                  <Button type = "button" title="Remove from cart" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                                  <i className='fas fa-trash'></i>
                                                  </Button>
                                                </Col>

                                              </Row>
                                                                
                                            </ListGroup.Item>)
                                          }
                                        </ListGroup>
                                      )
            }
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>
                  Subtotal ({totalQty}) items!
                  </h2>
                  ${cartItems.reduce((acc,item)=> acc + item.qty * item.price, 0).toFixed(2)}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button type="button" className='btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>
                    Proceed to checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

        </Row>
      </>
    )
  }

export default CartScreen