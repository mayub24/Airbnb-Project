const express = require('express');
const router = express.Router();


router.get('/room', (req, res) =>
{
    const title = 'Airbnb | Rooms';
    const style = 'room.css';
    const homeIcon = '<i class="fas fa-home"></i>'; 
    const moneyIcon = '<i class="fas fa-dollar-sign"></i>';
    const locationIcon = '<i class="fas fa-map-marker-alt"></i>';

    res.render('rooms/room', {
        ttl: title,
        sty: style,
        icon: homeIcon,
        icon2: moneyIcon,
        icon3: locationIcon
    });
})



module.exports = router;