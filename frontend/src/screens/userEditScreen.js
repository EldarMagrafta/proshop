import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageComp from '../components/MessageComp.js'
import LoaderComp from '../components/LoaderComp.js'
import FormContainerComp from '../components/FormContainerComp.js'
import {getUserDetails, updateUser} from '../actions/userActions.js'


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

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const loadingUpdate = userUpdate.loading
    const errorUpdate = userUpdate.error
    const successUpdate = userUpdate.success

    // const isDisabled = !(name && email && password && confirmPassword);

    useEffect(() => {
        //throw unauthorized users back to homepage
        if (!userInfo || (userInfo && !userInfo.isAdmin)) {
            navigate('/')
            return
        }
        if(successUpdate){
            dispatch({type: "USER_UPDATE_RESET"})
            navigate('/admin/userlist')
        }
        else{
            if(!user.name || !user.email || user._id !== userId){
                dispatch(getUserDetails(userId))
            }
            else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, navigate, user, userId, successUpdate])


    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateUser( {_id: userId, name, email, isAdmin } ))
     
    }




  return (
    <>
        <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
        <FormContainerComp>
            <h1>Edit User</h1>
            {loadingUpdate && <LoaderComp/> }
            {errorUpdate && <MessageComp variant='danger'>{errorUpdate}</MessageComp>}
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
                            <Form.Check type='checkbox' label='Make Admin?' checked={isAdmin} 
                            onChange={(e) => setIsAdmin(e.target.checked)} inline>
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