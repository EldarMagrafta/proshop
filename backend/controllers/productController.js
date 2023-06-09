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
    const pageSize = 10 //maximum number of products for each page
    const page = Number(req.query.pageNumber) || 1
    let keyword = {};
    if (req.query.keyword) { //if the query string of the request URL  contains a parameter named "keyword"
        keyword = {
            name: {
                $regex: req.query.keyword, //The regular expression will find any occurrence of the keyword within the name field.
                $options: 'i' //case-insensitive regular expression match.
            }
        };
    }
    const count = await Product.countDocuments({...keyword}) //total number of products that match the search keyword. if there is no keyword, count will be equal to the number of total products in our shop
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1)) //The skip() method is used to skip a certain number of products based on the current page number
    return res.json({products, page, pages: Math.ceil(count/pageSize)});
});


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

/* 
@desc     Create new review
@route    POST /api/products/:id/reviews
@access   Private
*/
const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)
    if(product){
        //Checks if the user has already reviewed the product. It does this by searching for any review in the product's reviews array that matches the user's ID 
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        //calculates the average rating for the product based on its reviews.
        product.rating = product.reviews.reduce((acc, item)=>item.rating + acc, 0) / product.numReviews
        

        await product.save()
        res.status(201).json({message: `Review added successfully`})
    }
    else{
        res.status(404)
        throw new Error('Product not found')
    }
})


/* 
@desc     Get top rated products
@route    GET /api/products/top
@access   Public
*/
const getTopProducts = asyncHandler(async (req, res) => {
    //"products" is an array of the top 3 rated products
    const products = await Product.find({}).sort({rating: -1}).limit(3)
    res.json(products)
})

export {getProducts , getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts}