import mongoose from "mongoose"
import dotenv from 'dotenv'
import colors from 'colors'
import users from "./data/users.js"
import products from "./data/products.js"
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from "./config/db.js"

dotenv.config()
connectDB()

//This function imports sample data into the MongoDB database (after clearing it first).
const importData = async() =>{
    try{
        //Delete any existing data in the Order, Product, and User collections
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        //Insert new users into the User collection and store the _id of the first user as adminUser
        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        
        //Iterate over the products array and add the adminUser as the owner of each product
        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        })
        
        //Insert the updated products array into the Product collection
        await Product.insertMany(sampleProducts)
        
        //Log a message to the console indicating that the data import was successful
        console.log("Data Imported".green.inverse)
        
        //Exit the process with a successful exit code
        process.exit()
    }
    catch(error){
        // If there is an error during any step of the process, log the error message to the console and exit the process with an exit code of 1
        console.error(`${error}`.red.inverse)
        process.exit(1)

    }
}

const destroyData = async () =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log("Data Destroyed!".red.inverse)
        process.exit()
    }
    catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
        
    }
}

/* This block of code determines whether to import or destroy data in the MongoDB database
   based on the command-line argument passed to the script. If the argument is "-d", it calls
   the destroyData function, else, it calls the importData function, which clears the database 
   and populates it with sample data. */
if(process.argv[2] === "-d"){
    destroyData();
}
else{
    importData();
}