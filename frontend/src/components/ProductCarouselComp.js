import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image, Row, Col } from 'react-bootstrap';
import LoaderComp from './LoaderComp';
import MessageComp from './MessageComp';
import { listTopProducts } from '../actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';

const ProductCarouselComp = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector(state => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    loading ? <LoaderComp /> :
      error ? <MessageComp variant='danger'>{error}</MessageComp> :
        <>
          <h1>Most Popular</h1>
          <Carousel pause='hover' className='custom-carousel'>
            {products.map(prod => (
              <Carousel.Item key={prod._id}>
                <div className='carousel-item-content'>
                  <div className='carousel-item-image'>
                    <Link to={`product/${prod._id}`}>
                      <Image src={prod.image} alt={prod.name} fluid />
                    </Link>
                  </div>
                  <div className='carousel-item-text'>
                    <Link to={`product/${prod._id}`}>
                      <h4>{prod.name}</h4>
                      <h5>${prod.price}</h5>
                    </Link>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
  );
};

export default ProductCarouselComp;
