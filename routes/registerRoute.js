const express = require('express');
const router = express.Router();
// Getting model from model file
const model = require('../models/userModel');
const bcrypt = require('bcryptjs');
// const permission = require('../accessMiddleware/permission');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const roomModel = require('../models/roomModel');
const access = require('../accessMiddleware/access');


router.get('/register', (req, res) => {
    const title = 'Airbnb | Register';
    const style = 'register.css'
    // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    res.render('registration/register', {
        ttl: title,
        sty: style
    });
})


// POST REQUEST TO HANDLE ERRORS AND NODEMAILER
router.post('/regis', (req, res) => {
    const errors = [];

    console.log(req.body);

    // Creating formData that will hold user information
    const userData =
    {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        usr: req.body.usr,
        pass: req.body.pass,
        adrs: req.body.adrs,
        eml: req.body.eml,
        cpass: req.body.cpass
    }

    if (userData.cpass !== userData.pass) {
        errors.push('Passwords do not match');
    }

    // First name
    let firstNameReg = /^[A-Za-z0-9]{2,20}$/;

    if (!firstNameReg.test(userData.firstName)) {
        errors.push(`First name should have minimum of 20 characters.`);
    }

    // Last name
    let lastNameReg = /^[A-Za-z0-9]{2,20}$/;

    if (!lastNameReg.test(userData.lastName)) {
        errors.push(`Last name should have minimum of 20 characters.`);
    }

    // Name error handling
    let nameReg = /^[A-Za-z0-9]{2,25}$/;

    if (!nameReg.test(userData.usr)) {
        errors.push(`Username should be between 2 and 25 letters/numbers.`);
    }

    // Password error handling
    let passReg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*<>?]).{8,16}$/;

    if (!passReg.test(userData.pass)) {
        errors.push('Password must start with a capital letter, have a number and symbol, and must be between 8 and 16 characters.');
    }

    const adrsReg = /^([0-9]+)[ ]([A-Za-z0-9\.\# ].{4,30})$/;


    if (!adrsReg.test(userData.adrs)) {
        errors.push('Please enter a valid home address.')
    }

    // Email error handling
    const emailReg = /^([A-Za-z0-9_\-\.]+)@([A-Za-z0-9_\-\.]+)\.([a-z]{2,5})$/;

    if (!emailReg.test(userData.eml)) {
        errors.push('Please enter a valid email with an @ and a valid domain!');
    }


    // Checking for errors
    if (errors.length > 0) {
        const title = 'Airbnb | Register';
        const style = 'register.css';

        res.render('registration/register', {
            ttl: title,
            sty: style,
            err: errors,
            fname: userData.firstName,
            lname: userData.lastName,
            name: userData.usr,
            pass: userData.pass,
            adrs: userData.adrs,
            pNum: userData.pNum,
            eml: userData.eml
        });
    }

    else {
        const title = 'Airbnb | Register';
        const style = 'register.css';

        // SEND EMAIL
        const options = {
            auth: {
                api_key: `${process.env.NODEMAILER_KEY}`
            }
        }

        const mailer = nodemailer.createTransport(sgTransport(options)); // object that will send email

        const email = {
            to: [`${req.body.eml}`],
            from: 'airbnb@gmail.com',
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
            .then((yer) => {
                console.log(errors);
                console.log(yer);
                res.redirect(`/user/regis`);
            })
            .catch((err) => {
                console.log(`Something went wrong -> ${err}`);
            })


    }
});



// Adding new web page called regis
router.get('/regis', (req, res) => {
    const title = 'Airbnb | Dashboard';
    const style = 'send.css';

    res.render(`registration/send`,
        {
            ttl: title,
            sty: style
        });
})


// Getting login
router.get('/login', (req, res) => {
    const title = 'Airbnb | Login';
    const style = 'login.css';

    res.render(`registration/login`,
        {
            ttl: title,
            sty: style
        });
})



// Posting login
router.post('/login', (req, res) => {
    const title = 'Airbnb | Login';
    const style = 'login.css';
    const error = [];

    // Getting username and password
    const userData =
    {
        usr: req.body.usr,
        pass: req.body.pass
    }

    // Pulling data , checking if username is null
    // if username is null, then generate error and render same page
    // else compare using bcrypt compare the pass and create session and rdirect
    model.findOne({ usr: req.body.usr })
        .then((user) => {
            console.log(user);
            if (user == null) {
                error.push('Sorry, no username found.');
                res.render('registration/login',
                    {
                        err: error,
                        ttl: title,
                        sty: style
                    })
            }
            else {
                bcrypt.compare(userData.pass, user.pass)
                    .then((equal) => {
                        if (equal) {

                            // if the passwords are equal, create a session called userLogin for that specific user
                            // in this case, 'user' is the specified user
                            req.session.userLogin = user;

                            if (req.session.userLogin.type === 'Admin') {

                                req.session.adminLogin = true;
                                // redirect to homepage
                                res.redirect('/user/dashboard');
                            }
                            else {
                                // Create a user session
                                res.redirect('/user/dashboard');
                            }

                            // console.log(req.session.userLogin);
                        }
                        else {
                            // Create error
                            error.push('Password is incorrect for this username.');


                            // render same page
                            res.render('registration/login',
                                {
                                    err: error,
                                    ttl: title,
                                    sty: style
                                })
                        }
                    })
            }
        })
})



// Logout request
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})


// Removing booked rooms
router.post('/remove/:id', (req, res) => {
    model.findByIdAndUpdate(req.session.userLogin._id, {

        $pull: { bookedRooms: req.params.id }
    })
        .then((userz) => {
            console.log(userz);
            res.redirect('/user/dashboard');
        })

})


// Posting Room for Booking
router.post('/save/:id', (req, res) => {
    let roomArr = [];
    let errz = [];

    model.findByIdAndUpdate(req.session.userLogin._id, {

        $push: { bookedRooms: req.params.id }

    })
        .then((userId) => {

            console.log(userId);

            userId.bookedRooms.forEach((eachRoom) => {
                roomModel.findById((eachRoom))
                    .then((roomInfo) => {
                        console.log(`Room Array: ${roomArr}`);

                        for (let i = 0; i < roomArr.length; i++) {
                            if (roomArr.indexOf(roomInfo._id) === -1) {
                                errz.push('omg value exists bro');
                            }
                            else {
                                roomArr.push(roomInfo);
                            }
                        }


                        if (errz.length > 0) {
                            res.render('rooms/room',
                                {
                                    err: errz
                                })
                        }

                    })
            })

            res.redirect('/user/dashboard');
        })
})


//  WORKING CODE for Booking Rooms
router.get('/dashboard', access, (req, res) => {
    const title = 'Airbnb | Admin Dashboard';
    const style = 'room.css';

    model.findById(req.session.userLogin._id)
        .then((user) =>
            Promise.all(
                user.bookedRooms.map((eachRoom) => roomModel.findById(eachRoom)
                    .catch((err) => {
                        console.log(`Could not book rooms: ${err}`);
                    })
                )))
        .then(roomArr => {
            res.render('registration/dashboard', {
                rooms: roomArr,
                ttl: title,
                sty: style
            });
        })
})

module.exports = router;