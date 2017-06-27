var express = require('express');
var app = express();
//using pug templating engine
var pug = require('pug');

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

//create two folders, public stores code, css, and images fikes
//views stores layout
app.set('views', __dirname + '/views');
//use jade templating enginer
app.set('view engine', 'pug');
//don't use default layout file
app.set("view options", {layout:false});
app.use(express.static(__dirname + '/public'));

//what page we render on a get request to the url 
app.get('/', function (req, res) {
	res.render('home.pug');
});

//functions to use while connected to server
io.sockets.on('connection', function (socket) {
	socket.on('setPseudo', function (data) {
		socket.pseudo = data;
	});

	socket.on('message', function (message) {
		var name = socket.pseudo;
		var data = {'message' : message, pseudo: name};
		socket.broadcast.emit('message', data);
	});
});

//port we're listening on
server.listen(3000);