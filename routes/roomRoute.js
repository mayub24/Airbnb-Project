const express = require('express');
const router = express.Router();
const roomModel = require('../models/roomModel');


router.get('/room', (req, res) =>
{
    const title = 'Airbnb | Rooms';
    const style = 'room.css';
    // const homeIcon = '<i class="fas fa-home"></i>'; 
    // const moneyIcon = '<i class="fas fa-dollar-sign"></i>';
    // const locationIcon = '<i class="fas fa-map-marker-alt"></i>';


    // Use the model to pull data
    roomModel.find()
    .then((val) =>
    {
        res.render('rooms/room',
        {
            roomInfo: val,
            ttl: title,
            sty: style
        })
    })
    .catch(err => console.log(`Problem in pulling room ${err}`));

})

// Adding room
router.get('/newRoom', (req, res) =>
{
    const title = 'Add New Room | Airbnb';
    const style = 'newRoom.css';

    res.render('rooms/addRoom',
    {
        ttl: title,
        sty: style
    });

});


router.post('/newRoom', (req, res) =>
{

    // Put data
    const roomData =
    {
        name: req.body.name,
        location: req.body.location,
        roomz: req.body.roomz,
        bedz: req.body.bedz,
        bathrooms: req.body.bathrooms,
        floors: req.body.floors,
        guests: req.body.guests,
        price: req.body.price
    }

    const errors = [];

    // if(roomData.name == "")
    // {

    // }

    if(errors.length > 0)
    {
        res.render('rooms/addRoom', 
        {
            err: errors
        })
    }
    else
    {
        // else, save the document
        // if document is saved, redirect, else error
        const rooms = new roomModel(roomData);
        rooms.save()
        .then(() =>
        {
            res.redirect('/room');
        })
        .catch((err) =>
        {
            console.log(`Error in saving room ${err}`);
        })
    }

});


// Clicking Room Picture (using id)
// First getting the get request after clicking img
router.get('/info/:id', (req, res) =>
{

    const title = 'Room Info';
    const style = 'info.css';

    // Getting info about single task
    roomModel.findById(req.params.id)
    .then((val) =>
    {
        res.render('rooms/info', 
        {
            singleRoom: val,
            ttl: title,
            sty: style
        })
    })
    .catch((err) =>
    {
        console.log(`Error has occured in getting single room: ${err}`);
    })

})


// Clicking Edit Button

// Getting edit page
router.get('/edit/:id', (req, res) =>
{
    roomModel.findById(req.params.id)
    .then((val) =>
    {
        const title = 'Edit Room | Airbnb';
        const style = 'newRoom.css';

        res.render('rooms/editRoom',
        {
            ttl: title,
            sty: style,
            rooms: val
        });
        
    })
    .catch((err) => console.log(`error in edditing room ${err}`));

});


// Putting edit page
router.put('/edit/:id', (req, res) =>
{
    roomModel.findById(req.params.id)
    .then((val) =>
    {
        val.name = req.body.name,
        val.location = req.body.location,
        val.roomz = req.body.roomz,
        val.bedz = req.body.bedz,
        val.bathrooms = req.body.bathrooms,
        val.floors = req.body.floors,
        val.guests = req.body.guests,
        val.price = req.body.price

        // SAVE THE STUFF AGAIN
        val.save()
        .then(() =>
        {
            res.redirect('/room');
        })
        .catch((err) =>
        {
            console.log(`problem in redirecting ${err}`);
        })
        
    })
    .catch(err => console.log(`problem in putting edit ${err}`));
})



// Clicking Delete Button
router.delete('/delete/:id', (req, res) =>
{
    roomModel.deleteOne({_id: req.params.id})
    .then(() =>
    {
        res.redirect('/room');
    })
    .catch((err) =>
    {
        console.log(`Error in deleting room: ${err}`);
    })
})



module.exports = router;