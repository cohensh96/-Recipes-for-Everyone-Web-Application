require("dotenv").config();

// Express requires
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

// CORS , and CORS settings
const cors = require('cors');
const corsSettings = require('./config/corsOrigin');
const credentails = require('./middleware/credntials');

// database requires
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');

//Get Port from Process or default.
const PORT = process.env.SERVER_PORT || 3500;

// Connect to the Mongodb.
connectDB();


/*****************************
 *        Middleware.
 *****************************/

// Cors Middleware.
app.use(credentails);
app.use(cors(corsSettings));


// Body parser, JSON, and Cookie 
app.use(express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));
app.use('/refresh', require('./routes/refresh'));
app.use('/recipe', require('./routes/recipes'));
app.use('/comments', require('./routes/comments'));
app.use('/user', require('./routes/users'));



app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});


mongoose.connection.once('open', () => {
    app.listen(PORT, ()=> {
        console.log(`Server running on port ${PORT}`);
    });
    console.log("Connected to mongodb");
})