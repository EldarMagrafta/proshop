import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageComp from '../components/MessageComp.js'
import LoaderComp from '../components/LoaderComp.js'
import FormContainerComp from '../components/FormContainerComp.js'
import {login} from '../actions/userActions.js'

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //The search property specifically represents the query string part of the URL, including the ? character and any parameters and their values.
    const { search } = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin)
    const {loading , error, userInfo} = userLogin
    /*
    The URLSearchParams constructor get a String representig query-string and returns an instance of the URLSearchParams object,
    which provides utility methods to work with query parameters in the URL.
    get(name): This method returns the value of the first query parameter with the specified name.
    */
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
    // console.log(redirect)
    // console.log(`/register?redirect=${redirect}`)

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])


    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
    }




  return (
    <FormContainerComp>
        <h1>Sing In</h1>
        {error && <MessageComp variant='danger'>{error}</MessageComp>}
        {loading && <LoaderComp/> }
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email} 
                onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group><br/>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} 
                onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group><br/>

            <Button type='submit' variant='primary'> Sign In</Button>

        </Form>

        <Row className='py-3'>
            <Col>
                First Time Here?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Register
                </Link>
            </Col>
        </Row>
    </FormContainerComp>
  )
}

export default LoginScreen