//Basic Library Import
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

//Import Security Middleware Library
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

//Import Database Library
const mongoose = require('mongoose');

//Implement Security Middleware
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//Implement body-parser Middleware
app.use(bodyParser.json());

//Implement Request Rate Limit Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3000, // Limit each IP to 3000 requests per `window` (here, per 15 minutes)
});
app.use(limiter);

//Mongo DB Database Connection
let URI = "mongodb+srv://osman:osman@cluster0.griei.mongodb.net/Todo";
let OPTION = {user: '', pass: ''}
mongoose.connect(URI, OPTION, (error) => {
    console.log("Database connection success");
    console.log(error);
});

//Implement Route
app.use("/api/v1", router);

//setup Undefined Route
app.use("*", (request, response) => {
    response.status(404).json({status: "fail", data:"Not Found"});
});


module.exports = app;
