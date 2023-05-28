import express from 'express'
import { authUser , getUserProfile , registerUser, updateUserProfile, getUsers } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

//URL starts with '/api/users'
router.route('/')
  .post(registerUser)
  .get(protect, admin, getUsers);

router.route('/login').post(authUser);


/*
A GET request to '/api/users/profile' is typically made when a user wants to view their own profile details. 
In this case, the user has already logged in and obtained a token through the authentication process. 
The token is then included in the Authorization header of the GET request to prove the user's identity. 
The "protect" middleware checks the validity of the token and allows the request to proceed to the getUserProfile function, 
which retrieves the user's details from the database and sends a JSON response with the user's details back to the client.

When a GET request is made to "/profile", the "protect" middleware function is called first and then passes control to the next middleware function in
the chain (which is getUserProfile in this case) using the next() function.
*/
router.route('/profile').get(protect , getUserProfile)
                        .put(protect, updateUserProfile)


export default router