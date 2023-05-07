import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

 /* define a new userSchema object using the mongoose.Schema() constructor. 
    The userSchema object defines the structure of the documents that will be stored in the MongoDB collection.
    {timestamps : true} is an options object passed to the mongoose.Schema() constructor that tells Mongoose to add two additional
    fields to the schema: "createdAt" and "updatedAt". These fields will automatically record the creation and update time of each document in the collection. 
 */ 
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

/* 
Define an instance method called "matchPassword" on the userSchema object. 
This method uses "bcrypt.compare()" that takes a text password as an argument, hash it, and compares it to the hashed password stored in the document on the DB.
(the word "this" refers to the document on which the compare method is being called). 
If the two match, it returns true. Otherwise, it returns false. 
*/
userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword , this.password)
}

/*
A pre-save hook that is called before every time a user document is saved to the database, whether it's a new document being created or an existing document being updated.
This hook checks whether the password field has been modified before saving. 
If it has not been modified, it calls the next() middleware function (which is the Mongoose's built-in "save()" method which will save the updated document to the database). 
If it has been modified, it generates a salt and hashes the password using bcrypt before saving it to the database.
*/
userSchema.pre('save' , async function (next){
  if(!this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password , salt)
})



// Create a new Mongoose model named "User" using the userSchema object and associate it with a MongoDB collection named "users".
const User = mongoose.model('User', userSchema)

export default User

