import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    //the user that posted this review
    user: {  
      type: mongoose.Schema.Types.ObjectId, //The type of `user` field is "document in the database" (not String, Number etc), the syntax of this is "mongoose.Schema.Types.ObjectId"
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    //the user that created this product (he must be an admin)
    user: {  
      type: mongoose.Schema.Types.ObjectId, //The type of `user` field is "document in the database" (not String, Number etc), the syntax of this is "mongoose.Schema.Types.ObjectId"
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    reviews: [reviewSchema],

    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema, 'products')

export default Product


/*
 in Mongoose, the ref option is used to specify the name of the model that a field references. 
 When we define a field in a Mongoose schema with the ref option, we're telling Mongoose that the field should reference documents in the specified model.
 In the code above, the user field in the productSchema is defined with the ref option set to 'User'.
 This means that when we retrieve a product document, the user field will be populated with the corresponding User document from the users collection.
 */ 

/*
 The reviews field is an array of reviewSchema objects. 
 This field is used to store reviews of a product. Each reviewSchema object contain information on the reviewer's name, rating, and comment.
 By using an array, multiple reviews can be stored for a single product.
 */ 