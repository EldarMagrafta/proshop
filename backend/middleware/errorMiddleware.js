/*
* The notFound function is a middleware function that handles requests for routes that do not exist by creating a new error object with a custom message indicating that the requested URL was not found.
* It then sets the HTTP status code to 404 and passes the error object to the next middleware function in the chain using the next function.
*/
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}


/*
* sets up an error handling middleware function that handles errors for the entire application.
* Whenever there's an error on ANY of the routes or controllers, this function will be called to handle it.
* Sets the appropriate HTTP status code and sends a JSON response with an error message and stack trace (if applicable).
*/
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
  }


  export {notFound , errorHandler}



//So, in summary, notFound middleware function passes an error object to the next middleware function, which is errorHandler in this case, and errorHandler generates an appropriate error response to send back to the client.