import React , {useEffect}  from 'react'
import {useDispatch , useSelector} from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import {Row, Col, Button} from 'react-bootstrap'
import ProductComp from '../components/ProductComp'
import PaginateComp from '../components/PaginateComp';
import LoaderComp from '../components/LoaderComp'
import MessageComp from '../components/MessageComp'
import { listProducts } from '../actions/productActions'
import ProductCarouselComp from '../components/ProductCarouselComp';
import MetaComp from '../components/MetaComp';




/*
* The productList is a specific slice from the state store.
* The productList object contains three properties: loading, error, and products. 
* These properties correspond to the different possible states of the product list: when the product list is being requested (loading: true), 
* when the product list has been successfully fetched (loading: false, products array containing the product data),
* and when there is an error while fetching the product list (loading: false, error string containing the error message).
*/
const HomeScreen = () => {

  //The useDispatch hook is used to get the dispatch function from the Redux store, which can be used to dispatch actions to the store.
  const dispatch = useDispatch()

  let navigate = useNavigate();

  // const {keyword, pageNumber} = useParams();

  const {keyword} = useParams();
  const params = useParams();
  const pageNumber = params.pageNumber || 1 //if params.pageNumber is undefined or falsy, it assigns the default value of 1 to pageNumber.
  

  //takes a function as its argument that selects a specific slice of the state from the Redux store, and returns the current value of that slice.
  const productList = useSelector(state => state.productList)

  const {loading , error , products, page, pages} = productList


  /* why calling "dispatch(listProducts())" and not listProducts()?
   * when we call dispatch(listProducts()), we are telling Redux to execute this returned function (the async anonymous function that listProducts() return), which will dispatch the appropriate actions based on the result of the API call.
   *
   * why putting "dispatch" inside the dependancy list?
   * its have to do with some things about useCallbacks, But because the dispatch function is not likely to change frequently during the lifetime of the component, the effect function will likely only run once after the initial render cycle.
  */
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber]);

  const searchAndFound = keyword && products.length > 0;
  const searchAndNotFound = keyword && products.length === 0;
  const noSearch = !keyword;

  

  return (
  <>
    <MetaComp/>
    
    {
    loading ? <LoaderComp/> : 

    error ? <MessageComp variant='danger'>{error}</MessageComp> :

    noSearch ? (<>
      <ProductCarouselComp/>
      <h1>ALL PRODUCTS</h1>
      <Row>
          {
              products.map((product)=> (
                  <Col key ={product._id} sm={12} md={6} lg={4} xl={3}>
                      <ProductComp product = {product}/>
                  </Col>
              ))
          }
      </Row>
      <PaginateComp pages={pages} page={page} keyword={keyword ? keyword : ''}/>
      </>
      ) :

    searchAndFound ? (<>
      <h1>search results for "{keyword}"</h1>
      <Button className='btn btn-secondary my-3' onClick={() => navigate(-1)}>GO BACK </Button>
      <Row>
          {
              products.map((product)=> (
                  <Col key ={product._id} sm={12} md={6} lg={4} xl={3}>
                      <ProductComp product = {product}/>
                  </Col>
              ))
          }
      </Row>
      <PaginateComp pages={pages} page={page} keyword={keyword ? keyword : ''}/>
    </>):

    searchAndNotFound ? <>
    <Button className='btn btn-secondary my-3' onClick={() => navigate(-1)}>GO BACK </Button>
    <h1>didnt found items for "{keyword}"</h1> </> : null
    
    

        }</>)
}


export default HomeScreen
