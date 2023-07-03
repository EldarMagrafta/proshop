import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Carousel, Image, Row, Col } from 'react-bootstrap';
import LoaderComp from './LoaderComp'
import MessageComp from './MessageComp'
import { listTopProducts } from '../actions/productActions.js'
import { useDispatch, useSelector } from 'react-redux'

const ProductCarouselComp = () => {

    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    const {loading, error, products} = productTopRated

    useEffect(() =>{
        dispatch(listTopProducts())
    }, [dispatch])



  return (
    loading ? <LoaderComp/> : 
    error ? <MessageComp variant='danger'>{error}</MessageComp> :
    (<>
        <h1>Most Popular</h1>
        <Carousel pause='hover' className='custom-carousel'>
            {
                products.map(prod => (
                    <Carousel.Item key={prod._id}>
                        <Row>
                            <Col md={6}>
                            <Link to={`product/${prod._id}`}>
                                <Image src={prod.image} alt={prod.name} fluid />
                            </Link>
                            </Col>
                            <Col md={4}>
                            <Carousel.Caption className='carousel-caption'>
                                <Link to={`product/${prod._id}`}>
                                    <h4>{prod.name} <br /> (${prod.price})</h4>
                                </Link>
                            </Carousel.Caption>
                            </Col>
                        </Row>
                    </Carousel.Item>

                ))
            }
        </Carousel>
    </>
    )

  )
}

export default ProductCarouselComp