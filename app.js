const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const path = require('path')
const Trip = require('./models/trip')
const userRoutes = require('./routes/users')
const session = require('express-session')
app.use(express.static('static'))
app.use('/users',userRoutes)

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
  
app.use(express.json())
app.use(express.urlencoded())

const VIEWS_PATH = path.join(__dirname, '/views')
global.tripList = []
global.users =  [{username: 'johndoe', password: 'password'}] 

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))

//pages are located in the views directory
app.set('views', VIEWS_PATH)
//extension will be .mustache
app.set('view engine', 'mustache')

let users = []


app.get('/', (req, res) => {
    res.render('index')
})





app.listen(3000, () => {
    console.log("Server is running successfully")
})