import React, { useEffect } from 'react';
import { Table, Button, Row, Col, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MessageComp from '../components/MessageComp';
import LoaderComp from '../components/LoaderComp';
import PaginateComp from '../components/PaginateComp';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { useNavigate } from 'react-router-dom';

function ProductListScreen() {

  const params = useParams();
  const pageNumber = params.pageNumber || 1 //if params.pageNumber is undefined or falsy, it assigns the default value of 1 to pageNumber.
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const loadingDelete = productDelete.loading
  const errorDelete = productDelete.error
  const successDelete = productDelete.success

  const productCreate = useSelector((state) => state.productCreate);
  const loadingCreate = productCreate.loading
  const errorCreate = productCreate.error
  const successCreate = productCreate.success
  const createdProduct = productCreate.product
 

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // dispatch({type: "PRODUCT_CREATE_RESET"})

    // If no user is logged-in or the logged-in user isn't an admin
    if (!userInfo || (userInfo && !userInfo.isAdmin)) {
      navigate('/login');
      // return
    }
    //if a sample product was successfuly created, redirect to edit it
    if(successCreate){
      dispatch({type: "PRODUCT_CREATE_RESET"})
      navigate(`/admin/product/${createdProduct._id}/edit`)
    }
    //if the logged-in user is an admin
    else {
      dispatch(listProducts('', pageNumber))
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, pageNumber]);

  const deleteHandler = (id) => {
    const confirmDelete = window.confirm('You are about to delete this product');
    if(confirmDelete){
      dispatch(deleteProduct(id))
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct())
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
      {loadingCreate && <LoaderComp/>}
      {errorCreate && <MessageComp variant='danger'>{errorCreate}</MessageComp>}
      {loading ? (
        <LoaderComp />
      ) : error ? (
        <MessageComp variant='danger'>{error}</MessageComp>
      ) : (
        <>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>IMAGE</th>
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
                <td style={{ width: '100px' }}><Image src={product.image} alt={product.name} fluid rounded></Image></td>
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
        <PaginateComp pages={pages} page={page} isAdmin={true}/>
        </>
      )}
    </>
  );
}

export default ProductListScreen;
