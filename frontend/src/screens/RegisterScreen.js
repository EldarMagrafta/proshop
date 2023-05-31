import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageComp from '../components/MessageComp.js'
import LoaderComp from '../components/LoaderComp.js'
import FormContainerComp from '../components/FormContainerComp.js'
import {register} from '../actions/userActions.js'

const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)



    const { search } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister = useSelector(state => state.userRegister)
    const {loading , error, userInfo} = userRegister

    /* these lines extract the value of the redirect parameter from the URL query string, which is later used for redirection after a successful user registration. 
    If the redirect parameter is not provided, the default value of '/' is used.
    */
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    const isDisabled = !(name && email && password && confirmPassword);

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])


    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(register(name, email, password))
        }
    }




  return (
    <FormContainerComp>
        <h1>Sing Up</h1>
        {message && <MessageComp variant='danger'>{message}</MessageComp>}
        {error && <MessageComp variant='danger'>{error}</MessageComp>}
        {loading && <LoaderComp/> }

        <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter name' value={name} 
                onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group><br/>

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

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group><br/>

            <Button type='submit' disabled={isDisabled} variant='primary'> Register</Button>

        </Form>

        <Row className='py-3'>
            <Col>
                Have an Account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
                </Link>
            </Col>
        </Row>
    </FormContainerComp>
  )
}

export default RegisterScreen