import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


/* 
@desc     Fetch all products.
@route    GET /api/products
@access   Public
==============================================
"asyncHandler" is a high-order function. it recieves an anonymous-async-function as its argument, 
and return this exact same function, wrapped with a try-catch block.
then, the wrapped function is saved into the variable "getProducts".
meaning, the name "getProducts" refers to the anonymous-async-function wrapped with error-handling.
*/
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    return res.json(products)

})

/* 
@desc     Fetch single product.
@route    GET /api/products/:id
@access   Public
*/
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        return res.json(product)
    }
    else{
        res.status(404)
        throw new Error("Product not found")
    }

})

/* 
@desc     Delete a product
@route    DELETE /api/products/:id
@access   Private/Admin
*/
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        await product.deleteOne()
        res.json({message: `Product with id ${req.params.id} removed`})
    }
    else{
        res.status(404)
        throw new Error("Product not found")
    }

})

export {getProducts , getProductById, deleteProduct}