import React, {useState , useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem , Form } from 'react-bootstrap'
import RatingComp from '../components/RatingComp'
import {useDispatch , useSelector} from 'react-redux'
import { listProductDetails, createProductReview } from '../actions/productActions'
import LoaderComp from '../components/LoaderComp'
import MessageComp from '../components/MessageComp'
import { addToCart } from '../actions/cartActions'



// page we see when we click on some product in the catalog
function ProductScreen() {

  const dispatch = useDispatch()
  let navigate = useNavigate();
  let params = useParams();

  //chosen quantity by user
  const [qty , setQty] = useState(1)

  const [rating , setRating] = useState("")
  const [comment , setComment] = useState("")

  const productDetails = useSelector(state => state.productDetails)
  const {loading , error  , product} = productDetails

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const errorProductReview = productReviewCreate.error
  const successProductReview = productReviewCreate.success

  const userLogin = useSelector(state => state.userLogin)
  const userInfo = userLogin.userInfo; 

  //qtrArr is an array of numbers from 1 to product.countInStock (inclusive)
  let qtyArr = [...Array(product.countInStock).keys()].map(x => x + 1);

  useEffect(() => {
    if(successProductReview){
      alert('Review Submitted!')
      setRating("");
      setComment('')
      dispatch({type : 'PRODUCT_CREATE_REVIEW_RESET' })
    }
    dispatch(listProductDetails(params.id))
  }, [dispatch , params.id, successProductReview]);

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

  const submitHandler = (e) =>{
    e.preventDefault()
    const userReview = {rating : rating , comment : comment}
    dispatch(createProductReview(params.id, userReview))
  }
  


  return (
    <>
 
      <Button className='btn btn-secondary my-3' onClick={() => navigate(-1)}>GO BACK </Button>

      {
        loading ? <LoaderComp/> :
        error ? <MessageComp variant='danger'/> :
        (<>
          <Row>
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
                  {/* "(Based on {product.numReviews} reviews) */}
                  ({product.numReviews} reviews)
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
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <MessageComp>No Reviews Yet</MessageComp>}
              <ListGroup variant='flush'>
                {product.reviews.map(review => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <RatingComp score={review.rating}></RatingComp>
                  <p>{review.createdAt.substring(0,10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>))}

                <ListGroup.Item>
                  <h2>Write a Costumer Review</h2>
                  {errorProductReview && <MessageComp variant='danger'>{errorProductReview}</MessageComp>}
                  {
                    userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)} required>
                          <option value="">Select Rating</option> {/* Add an initial empty option */}
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea' row='3' value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>Submit</Button>
                    </Form>) 
                    
                    : <MessageComp>Please <Link to='/login'>sign in</Link> to write a review</MessageComp>
                  }


                </ListGroup.Item>

              </ListGroup>
            </Col>
          </Row>
        
        
        
        
        </>)
      } 
    </>
  )

  
}

export default ProductScreen