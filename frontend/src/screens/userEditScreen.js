import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageComp from '../components/MessageComp.js'
import LoaderComp from '../components/LoaderComp.js'
import FormContainerComp from '../components/FormContainerComp.js'
import {getUserDetails} from '../actions/userActions.js'

const UserEditScreen = () => {

    const { id } = useParams();
    const userId = id;   

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    const {loading , error, user} = userDetails

    // const isDisabled = !(name && email && password && confirmPassword);

    useEffect(() => {
        if(!user.name || !user.email || user._id !== userId){
            dispatch(getUserDetails(userId))
        }
        else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, user])


    const submitHandler = (e) =>{
        e.preventDefault()
     
    }




  return (
    <>
        <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainerComp>
            <h1>Edit User</h1>
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

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email' placeholder='Enter email' value={email} 
                            onChange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group><br/>

                        <Form.Group controlId='isadmin'>
                            <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} 
                            onChange={(e) => setIsAdmin(e.target.checked)}>
                            </Form.Check>
                        </Form.Group><br/>

                        <Button type='submit' variant='primary'> Update</Button>

                    </Form>

                )
            }
            
        </FormContainerComp>
    </>
    
  )
}

export default UserEditScreen