var express = require('express');
var app = express();
var port = 3000;
var userCounter = 0;

//render template
app.engine('jade', require('jade').__express);
app.set('views', './views')
app.set('view engine', 'jade');

//install server
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});

app.get('/', function (req, res) {
    userCounter++;
    res.render('index', { title: 'Easy App', message: 'Hello there user #'+userCounter+'!'});
})
