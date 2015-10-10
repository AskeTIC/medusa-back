//LIBRERIAS
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//EVENTOS
//Cuando se establece una conexión desde un cliente...
io.on('connection', function(socket){  
	//Muestro un aviso en backend 
	console.log("Cliente conectado!");
	//Emito al cliente un evento y un mensaje
	socket.emit('conexion-realizada', 'Conectado con éxito');

	//Cuando recibo datos...
	socket.on('data-sensor1', function(){
		console.log('guardar en BBDD y enviar a cliente.');
	});

	//Cuando se desconecta un cliente...
	socket.on('disconnect', function () {
    		io.emit('user disconnected');
  	});
});

//PUESTA EN ESCUCHA DEL SERVER
server.listen(3030, function() {  
    console.log('Servidor corriendo http://localhost:3030');
});
