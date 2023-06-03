import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageComp from '../components/MessageComp.js'
import LoaderComp from '../components/LoaderComp.js'
import FormContainerComp from '../components/FormContainerComp.js'
import {listProductDetails} from '../actions/productActions.js'


const ProductEditScreen = () => {

    const { id } = useParams();
    const productId = id;   
 
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [countInStock, setCountInStock] = useState(0)
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const {loading , error, product} = productDetails

    // const productUpdate = useSelector((state) => state.productUpdate)
    // const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
          if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
          }
          else {
            setName(product.name)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setDescription(product.description)
            setPrice(product.price)
            setCountInStock(product.countInStock)
          }
        } , [dispatch, navigate, product, productId])


    const submitHandler = (e) =>{
        e.preventDefault()
        //UPDATE PRODUCT
        console.log("UPDATE PRODUCT!!!!")
    }


  return (
    <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainerComp>
            <h1>Edit Product</h1>
            {
                loading ? <LoaderComp/> : error ? <MessageComp variant='danger'></MessageComp> : 
                (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='name' placeholder='Enter name' value={name} 
                            onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group><br/>

                        <Form.Group controlId='price'>
                            <Form.Label>Price (USD$)</Form.Label>
                            <Form.Control type='number' min="0" step='0.01' placeholder='Enter price' value={price} 
                            onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group><br/>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter image url' value={image} 
                            onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>
                        </Form.Group><br/>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter brand' value={brand} 
                            onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group><br/>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type='number' min="0" step="1" placeholder='Enter count in stock' value={countInStock} 
                            onChange={(e) => setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group><br/>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter category' value={category} 
                            onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group><br/>

                        {/* <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Enter description' value={description} 
                            onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group><br/> */}

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                style={{ height: '150px', resize: 'none'}} // Apply inline styles
                                as='textarea' // Use the 'textarea' component instead of the default input
                                rows={3} // Specify the number of rows for the textarea
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group><br/>

                        <Button type='submit' variant='primary'>Update</Button>

                    </Form>

                )
            }
            
        </FormContainerComp>
    </>
    
  )
}

export default ProductEditScreen