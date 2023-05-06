import mongoose from 'mongoose'


/*
mongoose.connect() is called with two arguments: the first argument is a string containing the URL of the MongoDB database to connect to,
and the second argument (optional) is an object containing the connection options.
*/
const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI , {
            useUnifiedTopology : true,
            useNewUrlParser : true,
            dbName: 'proshop'
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.magenta.bold)

    } catch (error) {
        console.error(`Error: ${error.message}`.red.inverse)
        process.exit(1)
    }
}

export default connectDB;