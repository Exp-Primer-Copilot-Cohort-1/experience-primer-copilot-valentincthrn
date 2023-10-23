// create web server 

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

var comments = require('./comments.json');
var newComments = require('./newComments.json');

app.use(express.static('public'));

// get request
app.get('/', function(req, res){
    res.sendFile(__dirname + "/" + "index.html");
});

// post request
app.post('/process_post', urlencodedParser, function(req, res){
    // output json format
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "comment": req.body.comment,
        "date": req.body.date
    };
    console.log(response);
    // res.end(JSON.stringify(response));
    res.sendFile(__dirname + "/" + "index.html");
})

// post request
app.post('/process_post', jsonParser, function(req, res){
    // output json format
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "comment": req.body.comment,
        "date": req.body.date
    };
    console.log(response);
    // res.end(JSON.stringify(response));
    res.sendFile(__dirname + "/" + "index.html");
})

// get request
app.get('/comments', function(req, res){
    res.sendFile(__dirname + "/" + "comments.json");
});

// post request
app.post('/comments', urlencodedParser, function(req, res){
    // output json format
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "comment": req.body.comment,
        "date": req.body.date
    };
    console.log(response);
    // res.end(JSON.stringify(response));
    res.sendFile(__dirname + "/" + "comments.json");
})

// post request
app.post('/comments', jsonParser, function(req, res){
    // output json format
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "comment": req.body.comment,
        "date": req.body.date
    };
    console.log(response);
    // res.end(JSON.stringify(response));
    res.sendFile(__dirname + "/" + "comments.json");
})

// get request