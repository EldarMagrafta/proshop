//The "server.js" file is the main entry point of your Node.js application.

// Import the Express.js module and assign it to the constant variable 'express'
import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import { notFound , errorHandler} from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
// import products from './data/products.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'




// Load environment variables from a ".env" file into process.env making them available to the Node.js application
dotenv.config();

connectDB()

// Create a new instance of the Express application and assign it to the constant variable 'app'
const app = express();

//morgan is an HTTP request logger middleware for Node.js. It logs to the console information about incoming requests to the server
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}



//the express.json() middleware function is used to parse the incoming request body as JSON and populate the req.body object with the parsed data
app.use(express.json())


app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/orders' , orderRoutes)
app.use('/api/upload' , uploadRoutes)

app.get('/api/config/paypal' , (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
// console.log("__dirname:", __dirname);
// console.log(path.join(__dirname))
app.use('/uploads', express.static(path.join(__dirname)))

if(process.env.NODE_ENV === 'production'){
    // Serve static files from the 'frontend/build' directory
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    // For all other routes, serve the 'index.html' file
    app.get('*', (req,res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
}
else{
    // In development mode, respond with a simple message
    app.get('/' , (req , res) =>{
        return res.send("API RUNNING...")
    })
}


/*
* The notFound function is a middleware function that handles requests for routes that do not exist by creating a new error object with a custom message indicating that the requested URL was not found.
* It then sets the HTTP status code to 404 and passes the error object to the next middleware function in the chain using the next function.
*/
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

