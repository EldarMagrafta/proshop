import React, {useState , useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem , Form } from 'react-bootstrap'
import RatingComp from '../components/RatingComp'
import {useDispatch , useSelector} from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import LoaderComp from '../components/LoaderComp'
import MessageComp from '../components/MessageComp'
import { addToCart } from '../actions/cartActions'



// page we see when we click on some product in the catalog
function ProductScreen() {

  const productDetails = useSelector(state => state.productDetails)
  const {loading , error  , product} = productDetails

  const dispatch = useDispatch()

  let navigate = useNavigate();
  let params = useParams();

  //chosen quantity by user
  const [qty , setQty] = useState(1)

  //qtrArr is an array of numbers from 1 to product.countInStock (inclusive)
  let qtyArr = [...Array(product.countInStock).keys()].map(x => x + 1);

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch , params.id]);

  /*
  addToCartHandler is a function that is called by the UI when the user clicks on the "Add to Cart" button.
  first, the expression "addToCart(product._id, qty)" evaluates to the thunk function (lets call it foo) that is returned by addToCart,
  and then the "dispatch(foo)" is actually executing "foo"
  */
  const addToCartHandler = () =>{
    dispatch(addToCart(product._id, qty))
    alert("item added to cart (replace with toast later)")
    // navigate('/cart')

  }
  


  return (
    <>
      <Link className='btn btn-secondary my-3'  to ="/"> 
        Go Back
      </Link>
      {
        loading ? <LoaderComp/> :
        error ? <MessageComp variant='danger'/> :
        (<Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
  
          <Col md={3}>
            <ListGroup variant='flush'>
  
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
  
              <ListGroup.Item>
                <RatingComp score={product.rating} numOfReviews={product.numReviews}/>
              </ListGroup.Item>
  
              {/* item price */}
              <ListGroup.Item>
                <h3>${product.price}</h3>
              </ListGroup.Item>
  
              {/* item description */}
              <ListGroup.Item>
               {product.description}
              </ListGroup.Item>
  
            </ListGroup>
          </Col>
  
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
  
                <ListGroup.Item>
                  <Row>
                    <Col>
                        Price:
                    </Col>
                    <Col>
                       <strong> ${product.price} </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
  
                <ListGroup.Item>
                  <Row>
                    <Col>
                        Status:
                    </Col>
                    <Col>
                       {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {
                  product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col> Qty </Col>
                        <Col> 
                          <Form.Control as='select' value={qty} onChange={e => setQty(Number(e.target.value))}> 
                            {
                              qtyArr.map(x => (<option key = {x} value={x}> {x} </option>))
                            }
                          </Form.Control> 
                        </Col>
                      </Row>

                    </ListGroup.Item>
                  )
                }
  
                <ListGroup.Item>
                  <Button  onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>
                    Add To Cart!
                  </Button>
                </ListGroup.Item>
  
              </ListGroup>
            </Card>
              
          </Col>
        </Row>)
      } 
    </>
  )

  
}

export default ProductScreen