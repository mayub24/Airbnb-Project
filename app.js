// Getting express and handlebars modules
const express = require('express');
const handle = require('express-handlebars');

const app = express();

// Providing static files
app.use(express.static('public'));


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


// Setting up server
const PORT = 5000;

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
4. Create and connect to a remote repository
5. Push changes to remote repositorycd


*/