const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>
{
    const title = 'Airbnb';
    const style = 'home.css';

    res.render('home/home', {
        ttl: title,
        sty: style
    });
})

router.post('/home', (req, res) =>
{
    res.redirect('/room');

    // Pull rooms according to location inside the database
    // Therefore, in some way, we need to get location from documents saved inside the database
    // and then compare those locations with the locations in the room
    // then pull those rooms
    

})





module.exports = router;