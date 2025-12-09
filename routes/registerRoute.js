const express = require('express');
const router = express.Router();
// Getting model from model file
const model = require('../models/userModel');
const bcrypt = require('bcryptjs');
// const permission = require('../accessMiddleware/permission');
const roomModel = require('../models/roomModel');
const access = require('../accessMiddleware/access');
const { body, validationResult } = require('express-validator');

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
router.post('/regis', [
  // First Name
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 20 }).withMessage('First name should be between 2 and 20 characters.')
    .matches(/^[A-Za-z]+$/).withMessage('First name should only contain letters.'),

  // Last Name
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 20 }).withMessage('Last name should be between 2 and 20 characters.')
    .matches(/^[A-Za-z]+$/).withMessage('Last name should only contain letters.'),

  // Username
  body('usr')
    .trim()
    .isLength({ min: 2, max: 20 }).withMessage('Username should be between 2 and 20 characters.')
    .matches(/^[A-Za-z0-9]+$/).withMessage('Username should only contain letters and numbers.'),

  // Password
  body('pass')
    .isLength({ min: 8, max: 16 }).withMessage('Password must be between 8 and 16 characters.')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*<>?]).*$/)
    .withMessage('Password must contain uppercase, lowercase, number, and symbol.'),

  // Confirm Password
  body('cpass')
    .custom((value, { req }) => value === req.body.pass)
    .withMessage('Passwords do not match.'),

  // Address
  body('adrs')
    .matches(/^([0-9]+)[ ]([A-Za-z0-9\.\# ].{4,30})$/)
    .withMessage('Please enter a valid home address.'),

  // Email
  body('eml')
    .isEmail().withMessage('Please enter a valid email.')
],   async (req, res) => {

    const errors = validationResult(req);

// ✅ Only build groupedErrors if there are errors
if (!errors.isEmpty()) {
  const groupedErrors = {};
  errors.array().forEach(err => {
    if (!groupedErrors[err.path]) {
      groupedErrors[err.path] = [];
    }
    groupedErrors[err.path].push(err.msg);
  });
        console.log(groupedErrors);
        

        return res.render('registration/register', {
            ttl: 'Airbnb | Register',
            sty: 'register.css',
            err: groupedErrors,
            fname: req.body.firstName,
            lname: req.body.lastName,
            name: req.body.usr,
            pass: req.body.pass,
            adrs: req.body.adrs,
            pNum: req.body.pNum,
            eml: req.body.eml
        });
    }

    try {
        const title = 'Airbnb | Register';
        const style = 'register.css';

         const newUser = new model({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            usr: req.body.usr,
            pass: req.body.pass,
            adrs: req.body.adrs,
            eml: req.body.eml
        });

        await newUser.save();

        res.redirect(`/user/regis`);
    } catch (error) {
        console.log(`Something went wrong -> ${error}`);
        res.status(500).send('Server Error');
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
    model.findOne({ usr: req.body.usr }).lean()
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
                roomModel.findById((eachRoom)).lean()
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
                user.bookedRooms.map((eachRoom) => roomModel.findById(eachRoom).lean()
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