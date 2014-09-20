var express = require('express');
var router = express.Router();

var requestCounter = 0;

/* GET home page. */
router.get('/', function(req, res) {
    requestCounter++;
    res.render('index', { title: 'Shotgun' , message: 'Welcome to Easy App total requests: '+ requestCounter + '.'});
});

router.get('/home', function(req, res) {
    requestCounter++;
    res.render('home', { title: 'Select a Type' , message: 'Welcome to Easy App total requests: '+ requestCounter + '.'});
});

router.get('/hackathon', function(req, res) {
    requestCounter++;
    res.render('hackathon', { title: 'Hackathon' , message: 'Welcome to Easy App total requests: '+ requestCounter + '.'});
});

module.exports = router;
