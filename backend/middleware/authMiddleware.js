import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

/* 
Middleware functions are basically functions that sit between the client's request and the server's response. They take in the request, do some processing, and pass the request on to the next middleware function or the final route handler. Middleware functions are used to perform tasks such as authentication, error handling, parsing request bodies, etc.
In this particular file, we have a middleware function called protect. This function is used to protect routes that require authentication. 
When a client sends a request to a protected route, the protect function checks for an authorization token in the request headers. 
If a token is found, it is decoded using a secret key that is stored on the server.
The decoded token contains information about the user who sent the request, such as their user ID.
Next, the protect function uses the user ID to retrieve the user's information from the database. The user's information is then added to the request object (req.user) so that it can be accessed by any subsequent middleware functions or route handlers.
If no token is found in the request headers, or if the token is invalid, the protect function returns an error response with a 401 status code. This indicates that the client is not authorized to access the protected resource.
Finally, the protect function calls the next function to pass control on to the next middleware function or route handler in the stack.
 */

/*
The jwt.verify() function takes two arguments: the first argument is the token that was extracted from the request headers, 
and the second argument is the secret key used to sign the token. 
The function verifies that the token was signed using the same secret key and hasn't been tampered with since it was signed.
If the verification succeeds, jwt.verify() returns the decoded token payload.
what is the decoded token payload?
In JSON Web Token (JWT), the token is comprised of three parts: the header, the payload, and the signature.
The decoded token payload is the second part of the JWT which contains the actual data that is being transmitted. It is typically a JSON object that contains information about the user or entity that the token represents, such as user ID, username, or role.
*/
const protect = asyncHandler(async(req , res , next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){ //if there is a token
        console.log('token found')
        try{
            // Extract the token from the 'Authorization' header and remove the 'Bearer' prefix
            token = req.headers.authorization.split(' ')[1]
            // Verify the JWT token using the secret key and assign its "payload" part into the variable "decoded"
            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            //find in the DB the user object associated with the JWT token, and assign it (excluding the password field) to "user" property of the request
            req.user = await User.findById(decoded.id).select('-password')
            next() //gives the control to "getUserProfile" and passing "req" and "res" to it 
        }
        catch(error){//If the JWT token is invalid or has expired
            console.log(error);
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }
    if(!token){// if there is no token (the authorization header is not present or does not start with the "Bearer" prefix)
        res.status(401)
        throw new Error("Not authorized , no token")
    }

})

export {protect}