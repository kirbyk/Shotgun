var express = require('express');
var router = express.Router();

var requestCounter = 0;

/* GET home page. */
router.get('/', function(req, res) {
    requestCounter++;
    res.render('index', { title: 'Easy App' , message: 'Welcome to Easy App total requests: '+ requestCounter + '.'});
});

module.exports = router;
