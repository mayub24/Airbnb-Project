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




module.exports = router;