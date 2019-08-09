const session = require('express-session')
const express = require('express')
const router = express.Router()
const Trip = require('../models/trip')
router.use(express.urlencoded())





router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
  

router.get('/', (req, res) => {
    res.render('users')
})

router.get('/chat', authenticate, (req, res) => {
    res.render('chat', {username: req.session.username})
})

//middleware
function authenticate(req, res, next) {
    if(req.session) {
        if(req.session.username){

            next()
        }else {
            res.redirect('login')
        }
    }
}


router.post('/add-user', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let user = {username: username, password: password}

    users.push(user)

    res.redirect('login')
})

router.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    let persistedUser = users.find(user => {
        return user.username == username && user.password == password
    })
    if(persistedUser){
        //user is authenticated successfully
        if(req.session){
            req.session.username = persistedUser.username
            //where should we redirect
            res.redirect('viewTrips')
        }
    } else {
        //user is not authenticated 
        res.render('login', {message: 'Invalid username or password'})
    }
})

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(error => {
            if(error) {
                next(error)
            } else {
                res.redirect('login')
            }
        })
    }
})

router.get('/add-user', (req, res) => {
    res.render('add-user')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/addTrip', authenticate,(req, res) => {
    res.render('addTrip')
})

router.post('/add-trip', (req, res) => {
    let name = req.body.name
    let start = req.body.start
    let end = req.body.end
    let url = req.body.url    
    let tripID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let user = req.session.username

    let newTrip = new Trip(name, start, end, url, tripID, user)
    console.log(newTrip)
    tripList.push(newTrip)
    //put something in the session
    if(req.session){ //check if session is available
        req.session.name = name
}   

    res.redirect('viewTrips')
})


router.get('/viewTrips', authenticate, (req, res) => {
    let newTrips = tripList.filter(trip => {
        return trip.user == req.session.username
    })

    res.render('viewTrips', {newTrips: newTrips})
})


router.post('/delete-trip', (req, res) => {
    let tripName = req.body.tripName
    tripList = tripList.filter(trip => {
        return trip.tripID != tripName
    })
    res.redirect('viewTrips')
})




module.exports = router