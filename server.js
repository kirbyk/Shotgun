var express = require('express');
var port = 3000;
var userCounter = 0;
var path = require('path');

var routes = require('./routes/index');

var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

server.listen(port);
console.log("Listening on port: "+port);

// render engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
    console.log('Connected to server');

    socket.on('build request', function(msg){
        console.log('Attempting build.');
        console.log(msg);

        // console.log("Color1: "+msg.color1);

        //file saver (for build prefs)
        var fs = require('fs');

        // var toWrite = msg.color1;

        var text = "";
        if (msg.theme == 'light') {
            text += ".bar, .tabs { background-color: #ECF0F1; }\n"
            text += ".tab-item .icon, .tab-item .tab-title, .title { color: #2C3E50; }\n";
        }
        else {
            text += ".bar, .tabs { background-color: #2C3E50; }\n"
            text += ".tab-item .icon, .tab-item .tab-title, .title { color: white; }\n";
        }
        if (msg.color != '#000000') {
            text += ".tab-item .icon, .tab-item .tab-title, .title { color: " + msg.color + " !important; }\n";
        }

        text += ".pane { background-image: " + msg.bg + "; }";

        console.log(text);

        // //writing a text file with name of the image and color schemes
        fs.writeFile("./template-app/www/css/custom.css", text, function (err) {
            if (err) throw err;
            console.log('New build css created.');
        });

        var exec = require('child_process').exec;
        var child;
        var buildCommand = "cd template-app && ionic emulate ios";

        // executes `pwd`
        child = exec(buildCommand, function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            //console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
      });
});

// 404 forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
