// Import the Express.js module and assign it to the constant variable 'express'
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import { notFound , errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
// import products from './data/products.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'


// Load environment variables from a ".env" file into process.env making them available to the Node.js application
dotenv.config();

connectDB()

// Create a new instance of the Express application and assign it to the constant variable 'app'
const app = express();

//the express.json() middleware function is used to parse the incoming request body as JSON and populate the req.body object with the parsed data
app.use(express.json())


app.get('/' , (req , res) =>{
    return res.send("API RUNNING...")
})


app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)

app.use(notFound)

// Add the errorHandler to the middleware pipeline
app.use(errorHandler)





// Sets the value of PORT to the environment variable PORT, or 8000 if it is not set
const PORT = process.env.PORT || 8000;

/*
* Start the server by calling the 'listen' method of the 'app' instance
* Once the server is running, log a message to the console indicating that it is ready to receive requests
* The NODE_ENV variable is commonly used to specify the environment in which your application is running, such as development, testing, or production.
* The PORT variable specifies the port on which your Node.js application will listen for incoming requests.
*/
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta.bold));

