const express = require('express');
const router = express.Router();
const userModel = require('../models/roomModel');

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

    
    userModel.find({location: req.body.loc}) // finding all of those locations that match typed value
    .then((getLoc) =>
    {

        const title = 'Airbnb';
        const style = 'home.css';

        console.log(req.body.loc);
        console.log(getLoc);   
        
        if(getLoc == "")
        {
            error = [];

            error.push(`No Location "${req.body.loc}" found!`);

            res.render('home/home',
            {
                ttl: title,
                sty: style,
                errz: error
            })
        }
        else
        {
            const title = `${req.body.loc} Rooms`;
            const style = 'room.css';

            // When a location is found...
            // How do i pull a specific location???????
            res.render('rooms/locationRooms', 
            {
                local: getLoc,
                ttl: title,
                sty: style
            })
        }

    })
    .catch((err) =>
    {
        console.log(`could not get location: ${err}`);
    })

})





module.exports = router;