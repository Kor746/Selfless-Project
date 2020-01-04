const socketio = require('socket.io')
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const axios = require('axios');

const port = process.env.PORT || 8080;

const app = express();


const server = http.createServer(app);
const io = socketio(server);

io.on('prediction', socket => {
	console.log('hello'), setInterval(
		() => getApiAndEmit(socket),
		2000)
	socket.on('prediction', () => console.log('lol'));
});


server.listen(port, () => console.log('Listening on port: ' + port))
// var handleStatic, handleStream;

// var connections = [];

// const port = 8080;
// const server = app.listen(port, () => console.log("App listening on Port: " + port));
// const websocket = socketio(server);

// websocket.on('prediction', (data) => {
// 	console.log(data);	
// });

// websocket.emit('answer', 'lol');



// handleStream = function(req,res) {
// 	connections.push(res);
	
// }

// var server = http.createServer(handler)

// server.listen(8080, 'localhost', function() {
// 	console.log('Server up');
// });