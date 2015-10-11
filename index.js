//MODULOS DE TERCEROS
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//MODULOS PROPIOS
var utils = require('./utils/utils.js');
var routes = require('./routes/routes.js');

//Definición de namesapaces para sokets que vamos a usar.
var sensors = io.of('/sensors');
var users = io.of('/'); 

//MIDDLEWARES
app.use(express.static('../medusa-front'));

//Le indicamos que use nuestro enrutador
app.use('/', routes.router);

//RUTAS
app.get('/test', function(req, res) {  
  res.status(200).send("Hello World!");
});


//EVENTOS
//Cuando se establece una conexión desde un cliente user...
users.on('connection', function(socket){
	//Muestro un aviso en backend 
	console.log('Usuario conectado!');
	//Emito al usuario conectado un evento y un mensaje
	socket.emit('conexion realizada', 'Conectado con éxito');

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
	socket.emit('conexion-realizada', 'Conectado');


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
