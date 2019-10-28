// Getting express and handlebars modules
const express = require('express');
const handle = require('express-handlebars');
// Adding nodemailer/body-parser
const bodyParser = require(`body-parser`);
// Adding mongoose/mongodb
const mongoose = require('mongoose');
// const mongodb = require('mongodb');


const app = express();

// Providing static files
app.use(express.static('public'));

// Body parser middleware
// Tells express to parse all submitted form data into the body of the request object
app.use(bodyParser.urlencoded({ extended: false }));


// CONNECT MONGOOSE ODM TO MONGODB
mongoose.connect('mongodb+srv://user_1:12345@cluster0-o4izp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(() =>
{
    console.log(`Connection Successful!`);
})
.catch((err) =>
{
    console.log(`Error occured: ${err}`);
});


// Specifiying handlebar stuff
app.engine('handlebars', handle());
app.set('view engine', 'handlebars');

// Setting up routes
app.get('/', (req, res) =>
{
    const title = 'Airbnb';
    const style = 'home.css';

    res.render('home', {
        ttl: title,
        sty: style
    });
})

app.get('/room', (req, res) =>
{
    const title = 'Airbnb | Rooms';
    const style = 'room.css';
    const homeIcon = '<i class="fas fa-home"></i>'; 
    const moneyIcon = '<i class="fas fa-dollar-sign"></i>';
    const locationIcon = '<i class="fas fa-map-marker-alt"></i>';

    res.render('room', {
        ttl: title,
        sty: style,
        icon: homeIcon,
        icon2: moneyIcon,
        icon3: locationIcon
    });
})


app.get('/register', (req, res) =>
{
    const title = 'Airbnb | Register';
    const style = 'register.css'
    // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    res.render('register', {
        ttl: title,
        sty: style
    });
})


// POST REQUEST TO HANDLE ERRORS AND NODEMAILER
app.post('/send', (req, res) =>
{
    const errors = [];

    console.log(req.body);

    // Name error handling
    let nameReg = /^[A-Za-z0-9]{2,25}$/;

    if(!nameReg.test(req.body.usr))
    {
        errors.push(`User is incorrect!`);
    }

    // Password error handling
    let passReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*<>?]).{8,16}$/;

    if(!passReg.test(req.body.pass))
    {
        errors.push('Please enter a password.');
    }

    const adrsReg = /^([0-9]+)[ ]([A-Za-z0-9\.\# ].{4,30})$/;


    if(!adrsReg.test(req.body.adrs))
    {
        errors.push('Please enter a home address.')
    }

    // Phone error handling
    const numReg = /^\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}$/; 

    if(!numReg.test(req.body.pNum))
    {
        errors.push('Please enter a phone number.');
    }

    // Email error handling
    const emailReg = /^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([a-z]{2,5})$/;
    
    if(!emailReg.test(req.body.eml))
    {
        errors.push('Please enter an email.');
    }


    // Checking for errors
    if(errors.length > 0)
    {
        const title = 'Airbnb | Register';
        const style = 'register.css';
        
        res.render('register', {
            ttl: title,
            sty: style,
            err: errors
        });
    }

    else
    {

         // SEND EMAIL
        
        // API KEY ID:  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
        const nodemailer = require('nodemailer');
        const sgTransport = require('nodemailer-sendgrid-transport');

        const options = {
            auth: {
                api_key: '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'
            }
        }

        const mailer = nodemailer.createTransport(sgTransport(options)); // object that will send email
         
        const email = {
            to: [`${req.body.eml}`],
            from: 'airbnb@hotmail.com',
            subject: 'Email has been verified!',
            text: '',
            html: `
            <img src="https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c513.png" width="50px" height="20px">
            <br>
            <p>Hi ${req.body.usr},
            <br><br>
            Welcome to Airbnb! In order to get started, you need to confirm your email address!
            <br><br>
            <a href="https://airbnb-web.herokuapp.com/"><button style="background-color: #ff5a5f; padding: 10px; color: white; border: none; border-radius: 6px; ">Confirm Email</button></a>
            <br><br>
            Thanks,
            The TD Team</p>`
        };
         
        mailer.sendMail(email, (err, res) => {
            if (err) { 
                console.log(err) 
            }
            console.log(res);
        });


        // ADD DATABASE STUFF
        // CREATE SCHEMA
        const Schema = mongoose.Schema;

        const userSchema = new Schema({
            usr: 
            {
                type: String,
                required: true
            },
            pass: 
            {
                type: String,
                required: true
            },
            adrs: 
            {
                type: String,
                required: true
            },
            pNum: 
            {
                type: String,
                required: true
            },
            eml: 
            {
                type: String,
                required: true
            }
        });

        
        // CREATE MODEL
        const User = mongoose.model('users', userSchema);
       
        
        // Creating formData that will hold user information
        const userData = 
        {
            usr: req.body.usr,
            pass: req.body.pass,
            adrs: req.body.adrs,
            pNum: req.body.pNum,
            eml: req.body.eml
        }

        // INSTANTIATE MODEL
        const newUser = new User(userData);

        newUser
        .save()
        .then(() =>
        {
            console.log('Document created');
        })
        .catch((err) =>
        {
            console.log(`Something went wrong -> ${err}`);
        })

        res.redirect(`/send`);

    }
});


// Adding new web page called send
app.get('/send', (req, res) =>
{
    res.render(`send`);
})










// MONGODB TO HANDLE DATABASE INSERTION









// Setting up server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
{
    console.log(`Listening for port ${PORT}...`);
})


/*
GIT STEPS:

1. Initialize repository (git init)
2. Stage files and commit changed ( [git add .] or  [git add index.html] ) (use git status to check what has been added to staging area)
3. commit (maintains history of file incase changes are made) -> git commit -m "Airbnb Website"
*****(if changes are made, do 1. git add . and 2. git commit -m "Second commit" again)***
git log -> check history of all git commits that have been made
HEAD -> most recent commit
*If we make a mistake we can use ref# to go back and get the older commit*
4. Create and connect to a remote repository (git remote add origin https://github.com/mayub24/... [origin can be anything] )
5. Push changes to remote repository (git push -u origin master) -> This pushes the latest commit

6. if we wanna clone other ppls projects jus type [git clone url]


HEROKU STEPS:

hero


*/