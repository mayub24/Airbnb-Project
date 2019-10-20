// Getting express and handlebars modules
const express = require('express');
const handle = require('express-handlebars');
// Adding nodemailer/body-parser
const bodyParser = require(`body-parser`);
// Adding mongoose/mongodb



const app = express();

// Providing static files
app.use(express.static('public'));

// Body parser middleware
// Tells express to parse all submitted form data into the body of the request object
app.use(bodyParser.urlencoded({ extended: false }));



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

    if(req.body.usr == "")
    {
        errors.push('Please enter a name');
    }

    if(req.body.pass == "")
    {
        errors.push('Please enter a password');
    }

    if(req.body.adrs == "")
    {
        errors.push('Please enter an address')
    }

    if(req.body.pNum == "")
    {
        errors.push('Please enter a number');
    }

    if(req.body.eml == "")
    {
        errors.push('Please enter an email');
    }


    // Checking for errors
    if(errors.length > 0)
    {
        const title = 'Airbnb | Register';
        const style = 'register.css';
        
        res.render('register', {
            ttl: title,
            sty: style
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
            from: 'suhaibayub123@hotmail.com',
            subject: 'Email has been verified!',
            text: '',
            html: `<p>Hi ${req.body.usr},
            <br><br>
            Welcome to Airbnb! In order to get started, you need to confirm your email address.
            <br><br>
            <a href="https://airbnb-web.herokuapp.com/"><button>Confirm Email</button></a>
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