require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;
const { successResponse, errorResponse } = require("./middleware/responseHandler");

// Connect to mangoDB
connectDB();
// custom middleware logger
app.use(logger);

// handle options credentials check - before CORS! and fetch cookies credentials requirements
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit : '50mb' }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));


app.use(verifyJWT);
app.use('/log', require('./routes/api/log'));
app.use('/email', require('./routes/api/email'));
app.use('/user', require('./routes/api/user'));

app.use(successResponse);
app.use(errorResponse);

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
})
