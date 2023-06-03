import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageComp from '../components/MessageComp.js'
import LoaderComp from '../components/LoaderComp.js'
import FormContainerComp from '../components/FormContainerComp.js'
import {listProductDetails, updateProduct} from '../actions/productActions.js'


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
    const [uploading, setUploading] = useState(false)
    const [uploaded, setUploaded] = useState(false)
  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const {loading , error, product} = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        //throw unauthorized users back to homepage
        if (!userInfo || (userInfo && !userInfo.isAdmin)) {
            navigate('/')
            return
        }
        //if an update of the product details was made successfully
        if (successUpdate) {
            dispatch({ type: "PRODUCT_UPDATE_RESET" }) //Resetting "productUpdate" slice after a successful update, ensures the component is ready for future updates later
            navigate('/admin/productlist')

        } 
        else {
            /*
            dispatching listProductDetails(productId) when the product object is not available or the productId does not match the _id is a 
            mechanism to ensure that the component has the latest product details before putting them in the fields of the update-product-form
            */
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
        }
      }, [userInfo, dispatch, navigate, product, productId, successUpdate])


      const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload', formData, config)
          const desiredPart = data.slice(data.indexOf('/images')) //extract the part of the path from '/images' to the end
          setImage(desiredPart)
    
          setTimeout(() => {
            setUploaded(true)
            setUploading(false)
          }, 2000)
        } catch (err) {
          console.error(err)
          setUploading(false)
        }
      }

    const submitHandler = (e) =>{
        e.preventDefault()
        const productUpdatedFields = {
            _id: productId,
            name: name,
            image: image,
            brand: brand,
            category: category,
            description: description,
            price: price,
            countInStock : countInStock
        }
        dispatch(updateProduct(productUpdatedFields))
        dispatch(listProductDetails(productId))
    }


  return (
    <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainerComp>
            <h1>Edit Product</h1>
            {loadingUpdate && <LoaderComp/>}
            {errorUpdate && <MessageComp variant='danger'>{errorUpdate}</MessageComp>}
            {
                loading ? <LoaderComp/> : error ? <MessageComp variant='danger'>{error}</MessageComp> : 
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

                        {/* <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter image url' value={image} 
                            onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>
                        </Form.Group><br/> */
                        }
                        

                        <Form.Group controlId='image'>
                                    <Form.Label>Image</Form.Label><br/>
                                    <Image src={image} style={{ width: '100px', height: '100px', marginRight: '10px' }} fluid />
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter image url'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    ></Form.Control><br></br>
                                    <Form.Control
                                        label='Choose File'
                                        onChange={uploadFileHandler}
                                        type='file'
                                    ></Form.Control>
                                    {uploading && <LoaderComp />}
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