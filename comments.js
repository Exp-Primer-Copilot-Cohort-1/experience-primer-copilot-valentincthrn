// create web server 

// import express
const express = require('express');
// create object express
const app = express();
// import body-parser
const bodyParser = require('body-parser');
// import mongoose
const mongoose = require('mongoose');
// import express-session
const session = require('express-session');
// import connect-mongo
const MongoStore = require('connect-mongo')(session);
// import flash
const flash = require('connect-flash');
// import config
const config = require('./config/config').get(process.env.NODE_ENV);
// import routes
const api = require('./routes/api');
const user = require('./routes/user');
// import models
const { User } = require('./models/user');
const { Comment } = require('./models/comment');
// import middleware
const { auth } = require('./middleware/auth');

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

// use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// use express-session
app.use(session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

// use flash
app.use(flash());

// use express.static
app.use(express.static('client/build'));

// use routes
app.use('/api', api);
app.use('/user', user);

// get
app.get('/api/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    });
});

app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if(err) {
            return res.status(400).send(err);
        }
        res.sendStatus(200);
    });
});

// post
app.post('/api/register', (req, res) => {
    const user = new User(req.body);
    // save user
    user.save((err, doc) => {
        if(err) {
            return res.json({success: false});
        }
        res.status(200).json({
            success: true,
            user: doc
        });
    });
});

app.post('/api/login',