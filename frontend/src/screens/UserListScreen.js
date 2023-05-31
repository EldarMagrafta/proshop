
import React, {useEffect} from 'react'
import { Table, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageComp from '../components/MessageComp.js'
import LoaderComp from '../components/LoaderComp.js'
import { listUsers, deleteUser } from '../actions/userActions.js'
import { useNavigate } from 'react-router-dom'


function UserListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userList = useSelector(state=>state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state=>state.userDelete)
    const loadingDelete = userDelete.loading;
    const successDelete = userDelete.success;
    const errorDelete = userDelete.error;
    

    useEffect(()=> {
        //if the loogged-in user is an admin
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }
        //if no user is logged-in, or the logged-in user isnt an admin
        else{
            navigate('/login')
        }
    }, [dispatch, navigate, successDelete])


    const deleteHandler = (id) => {
        const confirmDelete = window.confirm('You are about to delete this user from the system');
        if (confirmDelete) {
          dispatch(deleteUser(id));
        }
      };
      
    


  return (
    <>
    <h1>Users</h1>
    {
        loading ? <LoaderComp/> : error ? <MessageComp variant='danger'>{error}</MessageComp>
        : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>
                                    {
                                    user.isAdmin ? (<i className='fas fa-check' style={{color:'green'}}></i>) :
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                    }
                                </td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </Table>
        )

    }

    </>
  )
}

export default UserListScreen