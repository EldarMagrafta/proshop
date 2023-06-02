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


/* 
@desc     Create a sample product
@route    POST /api/products
@access   Private/Admin
==============================================
the purpose of creating a sample products is so later we will update it
using the "updateProduct" handler
*/
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: "Sample name",
        image: "/images/sample.jpg",
        brand: "Sample brand",
        category: "Sample category",
        description: "Sample description",
      //reviews: //reviwes is not a required attribute
        rating: 0,
        numReviews: 0,
        price: 0,
        countInStock: 0
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


/* 
@desc     Update a product
@route    PUT /api/products/:id
@access   Private/Admin
*/
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        //update the properties of the product object with the values from the request body
        product.name = req.body.name
        product.image = req.body.image
        product.brand = req.body.brand
        product.category = req.body.category
        product.description = req.body.description
        product.price = req.body.price
        product.countInStock = req.body.countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }





})

export {getProducts , getProductById, deleteProduct, createProduct, updateProduct}