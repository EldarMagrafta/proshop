
import jwt from 'jsonwebtoken';
// This is an implementation of a function that generates a JSON Web Token (JWT) in a Node.js application.
// The generateToken() function takes an id parameter, which represents the user ID.
// It then generates a JWT using the jwt.sign() method from the jsonwebtoken library.
const generateToken = (id) => {

  // The first argument to the jwt.sign() method is an object that represents the payload of the JWT.
  // In this case, the payload object is { id : id }, where the id value is passed in as a parameter to the generateToken() function.
  const payload = { id: id };

  // The second argument to the jwt.sign() method is the secret or private key that is used to sign the JWT.
  // In this case, the secret key is stored in an environment variable called JWT_SECRET.
  // The value of the JWT_SECRET variable is accessed using process.env.JWT_SECRET.
  const secretKey = process.env.JWT_SECRET;

  // The third argument to the jwt.sign() method is an options object.
  // The expiresIn property is set to "30d", which means that the token will expire in 30 days.
  const options = { expiresIn: "30d" };

  // The jwt.sign() method generates the JWT using the payload, secret key, and options.
  // The function returns the JWT string.
  return jwt.sign(payload, secretKey, options);
}

// This implementation of the generateToken() function can be used in an authentication system where JWTs are used to authenticate and authorize users.
// Once a user logs in, a JWT can be generated using the generateToken() function and sent back to the client.
// The client can then include the JWT in the Authorization header of subsequent requests to protected endpoints in the application.
// The server can verify the authenticity of the JWT and extract the user ID from the payload to authorize the request.
export default generateToken;
