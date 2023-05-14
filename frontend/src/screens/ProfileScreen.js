import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageComp from '../components/MessageComp.js'
import LoaderComp from '../components/LoaderComp.js'
import {getUserDetails, updateUserProfile} from '../actions/userActions.js'

const ProfileScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const { search } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const {loading , error, user} = userDetails

    //userInfo is a JSON with the details of the user currently logged-in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    // const isDisabled = !(name && email && password && confirmPassword);

    useEffect(() => {
        if(!userInfo){ //if the user is not logged-in, redirect the page to login page
            navigate('/login');
        }
        else{ //if the user is logged-in
            if(!user || !user.name){
                dispatch(getUserDetails('profile'))
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }

        }
    }, [dispatch, navigate, userInfo, user])


    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(updateUserProfile({id: user._id , name: name , email : email, password: password}))
        }
    }




  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <MessageComp variant='danger'>{message}</MessageComp>}
            {error && <MessageComp variant='danger'>{error}</MessageComp>}
            {success && <MessageComp variant='success'>Profile Updated</MessageComp>}
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

                <Button type='submit' variant='primary'> Update</Button>

            </Form>

        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen