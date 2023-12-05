const express = require('express');
const router = express.Router();
const roomModel = require('../models/roomModel');
const path = require('path');
const access = require('../accessMiddleware/access');
const perm = require("../accessMiddleware/permission");
const model = require('../models/userModel');

router.get('/listedRooms', (req, res) =>
{
    const title = 'Airbnb | Rooms';
    const style = 'room.css';
    // const homeIcon = '<i class="fas fa-home"></i>'; 
    // const moneyIcon = '<i class="fas fa-dollar-sign"></i>';
    // const locationIcon = '<i class="fas fa-map-marker-alt"></i>';


    // Use the model to pull data
    roomModel.find().lean()
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
router.get('/newRoom', access, perm, (req, res) =>
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

    // check validation
    if(roomData.name == "")
    {
        errors.push('Room name is not valid.')
    }

    if(roomData.location == "")
    {
        errors.push('location is not valid.')
    }

    if(roomData.roomz == "")
    {
        errors.push('Number of rooms is not valid.')
    }

    if(roomData.bedz == "")
    {
        errors.push('Number of beds is not valid.')
    }

    if(roomData.bathrooms == "")
    {
        errors.push('Number of bathrooms is not valid.')
    }

    if(roomData.floors == "")
    {
        errors.push('Number of floors is not valid.')
    }

    if(roomData.guests == "")
    {
        errors.push('Number of guests is not valid.')
    }

    if(roomData.price == "")
    {
        errors.push('Price is not valid.')
    }

    // File errors
    if(req.files == null)
    {
        errors.push('please select an image');
    }
    else
    {
        if(req.files.roomPic.mimetype.indexOf("image") == -1)
        {
            errors.push('not an image file bruh!');
        }
    }

    if(errors.length > 0)
    {
        console.log(errors);

        const title = 'Add New Room | Airbnb';
        const style = 'newRoom.css';

        res.render('rooms/addRoom', 
        {
            err: errors,
            ttl: title,
            sty: style
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
            console.log(req.files.roomPic);
            req.files.roomPic.name = `pic_${rooms._id}_${path.parse(req.files.roomPic.name).ext}`;
            // Moving file to a specific location where we will be able to pull from
            req.files.roomPic.mv(`./public/img/${req.files.roomPic.name}`)
            .then(() =>
            {
                rooms.roomPic = req.files.roomPic.name;
                rooms.save()
                .then(() =>
                {
                    console.log(`picture saved to database`)
                    res.redirect('/room/listedRooms');
                })
            })
            .catch((err) =>
            {
                console.log(`err in pulling pictures: ${err}`);
            })

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
    roomModel.findById(req.params.id).lean()
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
router.get('/edit/:id',access,perm, (req, res) =>
{
    roomModel.findById(req.params.id).lean()
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
    roomModel.findById(req.params.id).lean()
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
            res.redirect('/room/listedRooms');
        })
        .catch((err) =>
        {
            console.log(`problem in redirecting ${err}`);
        })
        
    })
    .catch(err => console.log(`problem in putting edit ${err}`));
})



// Clicking Delete Button
router.delete('/delete/:id',perm, (req, res) =>
{
    roomModel.deleteOne({_id: req.params.id})
    .then(() =>
    {
        model.findByIdAndUpdate(req.session.userLogin._id,{
        
            $pull: {bookedRooms: req.params.id}
        })
        .then(() =>
        {
            res.redirect('/room/listedRooms');
        })
    .catch((err) =>
    {
        console.log(`Error in deleting room: ${err}`);
    })
})

})


// Manging rooms
router.get('/manager',access, (req, res) =>
{
    const title = 'Airbnb | Admin Rooms';
    const style = 'admin.css';
    roomModel.find().lean()
    .then((info) =>
    {
        res.render('rooms/manageRooms', 
        {
            roomz: info,
            ttl: title,
            sty: style
        })
    })
})

// // Posting Room for Booking
// router.post('/save/:id', (req, res) =>
// {
//     roomModel.findByIdAndUpdate(req.session.user._id)
//     .then((userId) =>
//     {
//         console.log(userId);
//         res.render('rooms/rooms');
//     })
// })


module.exports = router;