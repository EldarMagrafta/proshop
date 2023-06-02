import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MessageComp from '../components/MessageComp';
import LoaderComp from '../components/LoaderComp';
import { listProducts, deleteProduct } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';

function ProductListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const loadingDelete = productDelete.loading
  const errorDelete = productDelete.error
  const successDelete = productDelete.success
 

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // If the logged-in user is an admin
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    }
    // If no user is logged-in or the logged-in user isn't an admin
    else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    const confirmDelete = window.confirm('You are about to delete this product');
    if(confirmDelete){
      dispatch(deleteProduct(id))
    }
  };

  const createProductHandler = (product) => {
    // CREATE PRODUCT
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <LoaderComp/>}
      {errorDelete && <MessageComp variant='danger'>{errorDelete}</MessageComp>}
      {loading ? (
        <LoaderComp />
      ) : error ? (
        <MessageComp variant='danger'>{error}</MessageComp>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ProductListScreen;
