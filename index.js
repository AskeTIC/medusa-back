//MODULOS DE TERCEROS
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//MODULOS PROPIOS
var errors = require('./utils/errors');
var routes = require('./routes/routes');

//Definición de namesapaces para sokets que vamos a usar.
var sensors = io.of('/sensors');
var users = io.of('/');

//MIDDLEWARES
app.use(express.static('public'));


//Le indicamos a nuestra app que use nuestro enrutador
app.use('/', routes.router);

//EVENTOS

//NAMESPACE '/orders' QUE ES PARA LOS CONTROLADORES
//Cuando se establece una conexión desde un cliente user...
users.on('connection', function(socket){
	//Muestro un aviso en backend
	console.log('cliente conectado!');
	//Emito al usuario conectado un evento y un mensaje
	socket.emit('conexion realizada', 'Conectado con éxito');

	//ORDENES ESPECIFICAS DESDE EL USUARIO
	//Cuando recibo el evento carga-controller...
	socket.on('carga-controller', function(orden){

		console.log('carga-controller :' + orden);
	});

	//Cuando recibo el evento desplazamiento-controller...
	socket.on('desplazamiento-controller', function(orden){

		console.log('desplazamiento-controller :' + orden);
	});

	//Cuando recibo el evento vela-controller...
	socket.on('vela-controller', function(orden){

		console.log('vela-controller :' + orden);
	});

	//Cuando recibo el evento pertiga-controller...
	socket.on('pertiga-controller', function(orden){

		console.log('pertiga-controller :' + orden);
	});


	//ORDENES GENERALES: SISTEMAS, ETC..
	//Cuando recibo el evento sistems-controller...
	socket.on('sistems-controller', function(data){
		var status = false;
		if(status === true){
			socket.emit('sistems-up', data);//TODO: Pasarle algo? En principio creo que dependiendo la fase o ensayo quizás haya que crear algo al respecto.
			status = false;
		}else{
			socket.emit('sistems-down', data+1)//TODO: Pasarle algo?
			status = true;
		}
	});

	//Cuando se desconecta el usuario...
	socket.on('disconnect', function () {
		//Haré algo al respecto, si pogo io.emit envío a todos los usuarios
    		socket.emit('user disconnected'); //En este caso me interesará avisarle de que se ha descopnectado para que vuelva a conectar. Por ejemplo
  	});
});

// NAMESPACE '/sensors' QUE ES PARA LOS SENSORES
// cuando se establece una conexión desde un cliente sensor...
sensors.on('connection', function(socket){
	//Muestro un aviso en el backend
	console.log('Sensor conectado!');
	//Emito al sensor un evento y un mensaje para actuar en consecuencia.
	socket.emit('conexion-realizada', 'Conectado');

	//RECIBO LOS DATOS DE LOS SENSORES
	//Cuando recibo datos del termomentro..
    socket.on('data-temperature', function(data){
        //TODO: guardar el BBDD y enviar al cliente correspondiente.
        console.log('data-temperature : '+data);
    });

	//Cuando recibo datos del inclinometro norte...
	socket.on('data-inclinometro-norte', function(data){
		//TODO: guardar el BBDD y enviar al cliente correspondiente.
		console.log('data-inclinometro-norte : '+data);
	});

	//Cuando recibo datos del incinometro sur...
	socket.on('data-inclinometro-sur', function(data){
		//TODO: guardar el BBDD y enviar al cliente correspondiente.
		console.log('data-inclinometro-sur : '+data);
	});

	//Cuando recibo datos del sensor1...
	socket.on('data-incinometro-este', function(data){
		//TODO: guardar el BBDD y enviar al cliente correspondiente.
		console.log('data-inclinometro-este : '+data);
	});

	//Cuando recibo datos del inclinometro oeste...
	socket.on('data-inclinometro-oeste', function(data){
		//TODO: guardar el BBDD y enviar al cliente correspondiente.
		console.log('data-inclinometro-oeste : '+data);
	});

	//Cuando se desconecta el sensor...
	socket.on('disconnect', function () {
        //Haré algo al respecto, si pogo io.emit envío a todos los usuarios
        socket.emit('sensor disconnected'); //En este caso me interesará enviar a los clientes usuarios no sensores.
    });

});



//PUESTA EN ESCUCHA DEL SERVER
server.listen(3030, function() {
    console.log('Servidor corriendo http://localhost:3030');
});
