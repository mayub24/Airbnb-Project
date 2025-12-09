// Getting express and handlebars modules
const express = require('express');
const handle = require('express-handlebars');
// Adding nodemailer/body-parser
const bodyParser = require(`body-parser`);
// Adding mongoose/mongodb
const mongoose = require('mongoose');
// const getKey = require(`./config/key`);
const methodOverride = require('method-override');
// Express session
const session = require('express-session');
// File upload
const fileUpload = require('express-fileupload');

// get admin middleware
const admin = require('./accessMiddleware/admin');

// getting dotenv
require('dotenv').config();

// getting routes
const homeRoute = require('./routes/homeRoute');
const userRoute = require('./routes/registerRoute');
const roomRoute = require('./routes/roomRoute');

const app = express();

// Connecting session to express
app.use(session({ secret: 'This is a secret!' }));

// Providing static files
app.use(express.static('public'));

// Connecting file upload to express
app.use(fileUpload());

// Method override with express
app.use(methodOverride('_method'));


// Body parser middleware
// Tells express to parse all submitted form data into the body of the request object
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Creating a middleware that will be accessible to all express files
app.use((req, res, next) => {
    // Using locals to get the session name
    // locals = get value from the routes
    res.locals.user = req.session.userLogin;
    res.locals.admin = req.session.adminLogin;

    next();
})


// establishing routes
app.use('/', homeRoute);
app.use('/room', roomRoute);
app.use('/user', userRoute);

console.log(__dirname);


// Specifiying handlebar stuff
app.engine('handlebars', handle());
app.set('view engine', 'handlebars');


// mongoose.set('useFindAndModify', false);

// CONNECT MONGOOSE ODM TO MONGODB
mongoose.connect(process.env.MONGO_DB_URL)
    .then(async () => {
        console.log("Connection successful!");

        // Create admin ONLY after the DB is connected
        console.log("Creating admin (if needed)...");
        await admin();

        // Start server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}...`);
        });
    })
    .catch(err => {
        console.log(`Error occurred: ${err}`);
    });


