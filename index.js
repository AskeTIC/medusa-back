//MODULOS DE TERCEROS
var express = require('express');
var app = express();
var server = require('http').createServer(app);
//socket.io cuelga de server que es el que levantamos.
var io = require('socket.io')(server);

//MODULOS PROPIOS
var errors = require('./utils/errors');
var routes = require('./routes/routes');
//var sensors = require('./events/sensors');
var Orders = require('./events/orders');
var Sensors = require('./events/sensors');
var orders = Orders();
var sensors = Sensors();


//EVENTOS
//Definición de namesapaces para sokets que vamos a usar.
ordersIo = io.of('/');
sensorsIo = io.of('/sensors');
//TODO: Los namespaces de Sockets han de estar en este archivo los eventos no.
ordersIo.on('connection', orders.connectionOrders);
sensorsIo.on('connection', sensors.connectionSensors);

//MIDDLEWARES
app.use(express.static('../medusa-front'));
//Le indicamos a nuestra app que use nuestro enrutador
app.use('/', routes.router);

//PUESTA EN ESCUCHA DEL SERVER
server.listen(3030, function() {
    console.log('Servidor corriendo http://localhost:3030');
});
