//LIBRERIAS
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var sensors = io.of('/sensors');
var useres = io.of('/users'); 

//EVENTOS
//Cuando se establece una conexión desde un cliente user...
users.on('connection', function(socket){  
	//Muestro un aviso en backend 
	console.log('Usuario conectado!');
	//Emito al usuario conectado un evento y un mensaje
	socket.emit('conexion-realizada', 'Conectado con éxito');

	//Cuando se desconecta el usuario...
	socket.on('disconnect', function () {
		//Haré algo al respecto, si pogo io.emit envío a todos los usuarios
    		socket.emit('user disconnected'); //En este caso me interesará avisarle de que se ha descopnectado para que vuelva a conectar. Por ejemplo
  	});
});

// cuando se establece una conexión desde un cliente sensor...
sensors.on('connection', function(socket){
	//Muestro un aviso en el backend
	console.log('Sensor conectado!');
	//Emito al sensor un evento y un mensaje para actuar en consecuencia.
	socket.emit('conexion-rea0lizada', 'Conectado');


	//Cuando recibo datos del sensor1...
        socket.on('data-sensor1', function(){
                console.log('guardar en BBDD y enviar a cliente.');
        });

	//Cuando se desconecta el sensor... 
	socket.on('disconnect', function () {
                //Haré algo al respecto, si pogo io.emit envío a todos los usuarios
                socket.emit('user disconnected'); //En este caso me interesará avis$
        });


});




//PUESTA EN ESCUCHA DEL SERVER
server.listen(3030, function() {  
    console.log('Servidor corriendo http://localhost:3030');
});
