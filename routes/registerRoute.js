const express = require('express');
const router = express.Router();
// Getting model from model file
const model = require('../models/userModel');

router.get('/register', (req, res) =>
{
    const title = 'Airbnb | Register';
    const style = 'register.css'
    // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    res.render('registration/register', {
        ttl: title,
        sty: style
    });
})


// POST REQUEST TO HANDLE ERRORS AND NODEMAILER
router.post('/send', (req, res) =>
{
    const errors = [];

    console.log(req.body);

     // Creating formData that will hold user information
     const userData = 
     {
         usr: req.body.usr,
         pass: req.body.pass,
         adrs: req.body.adrs,
         pNum: req.body.pNum,
         eml: req.body.eml
     }


    // Name error handling
    let nameReg = /^[A-Za-z0-9]{2,25}$/;

    if(!nameReg.test(userData.usr))
    {
        errors.push(`Username should be between 2 and 25 letters/numbers.`);
    }

    // Password error handling
    let passReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*<>?]).{8,16}$/;

    if(!passReg.test(userData.pass))
    {
        errors.push('Password must start with a capital letter, have a number and symbol, and must be between 8 and 16 characters.');
    }

    const adrsReg = /^([0-9]+)[ ]([A-Za-z0-9\.\# ].{4,30})$/;


    if(!adrsReg.test(userData.adrs))
    {
        errors.push('Please enter a valid home address.')
    }

    // Phone error handling
    const numReg = /^\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}$/; 

    if(!numReg.test(userData.pNum))
    {
        errors.push('Phone number MUST be 10 digits!');
    }

    // Email error handling
    const emailReg = /^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([a-z]{2,5})$/;
    
    if(!emailReg.test(userData.eml))
    {
        errors.push('Please enter a valid email with an @ and a valid domain!');
    }

    // Checking for errors
    if(errors.length > 0)
    {
        const title = 'Airbnb | Register';
        const style = 'register.css';

        res.render('registration/register', {
            ttl: title,
            sty: style,
            err: errors,
            name: userData.usr,
            pass: userData.pass,
            adrs: userData.adrs,
            pNum: userData.pNum,
            eml: userData.eml
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
            <img src="https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c513.png" width="90px" height="40px">
            <br>
            <p>Hi ${req.body.usr},
            <br><br>
            Welcome to Airbnb! In order to get started, you need to confirm your email address!
            <br><br>
            <a href="https://airbnb-web.herokuapp.com/"><button style="background-color: #ff5a5f; padding: 10px; color: white; border: none; border-radius: 6px; ">Confirm Email</button></a>
            <br><br>
            Thanks,
            The Airbnb Team</p>`
        };
         
        mailer.sendMail(email, (err, res) => {
            if (err) { 
                console.log(err) 
            }
            console.log(res);
        });

        // INSTANTIATE MODEL
        const newUser = new model(userData);

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
router.get('/send', (req, res) =>
{
    const title = 'Airbnb | Dashboard';
    const style = 'send.css';

    res.render(`registration/send`, 
    {
        ttl: title,
        sty: style
    });
})


// Getting login
router.get('/login', (req, res) =>
{
    const title = 'Airbnb | Login';
    const style = 'login.css';

    res.render(`registration/login`, 
    {
        ttl: title,
        sty: style
    });
})



// Posting login
router.post('/login', (req, res) =>
{
    // Pulling data , checking if username is null
    // if username is null, then generate error and render same page
    // else compare using bcrypt compare the pass and create session and rdirect
})




module.exports = router;