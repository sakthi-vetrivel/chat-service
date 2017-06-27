var express = require('express');
var app = express();
var pug = require('pug');

var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

//create two folders, public stores code, css, and images fikes
//views stores 
app.set('views', __dirname + '/views');
//use jade templating enginer
app.set('view engine', 'pug');
//don't use default layout file
app.set("view options", {layout:false});
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('home.pug');
});
io.sockets.on('connection', function (socket) {
	socket.on('setPseudo', function (data) {
		console.log("Nickname set to " + data);
		socket.pseudo = data;
	});

	socket.on('message', function (message) {
		var name = socket.pseudo;
		var data = {'message' : message, pseudo: name};
		socket.broadcast.emit('message', data);
		console.log("User " + name + " : " + message);
	});
});

server.listen(3000);