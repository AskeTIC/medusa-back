//Librerías
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Eventos y rutas
io.on('connection', function(){  
	console.log("Cliente conectado!");
});

//Puesta en escucha del server
server.listen(3030);
