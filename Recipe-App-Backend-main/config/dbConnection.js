/**
 * Importing the 'mongoose' module, which provides a convenient way to interact with MongoDB databases.
 */
const mongoose = require('mongoose');
/**
 * Asynchronous function to establish a connection with the MongoDB database.
 * This function uses the 'mongoose.connect()' method to connect to the database.
 * It takes no parameters.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB