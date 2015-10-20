var DbModelSensors = require('../models/sensors');


module.exports = function Sensors(){

    //un objeto por cada collección a usar.
    var atmospherics = new DbModelSensors("atmospherics");
    var distances = new DbModelSensors("distances");
    var strongs = new DbModelSensors("strongs");
    var inclinometers = new DbModelSensors("inclinometers");

    return {
        // NAMESPACE '/sensors' QUE ES PARA LOS SENSORES
        // cuando se establece una conexión desde un cliente sensor...
        connectionSensors: function(socket){
        	//Muestro un aviso en el backend
        	console.log('Sensor conectado!');
        	//Emito al sensor un evento y un mensaje para actuar en consecuencia.
        	socket.emit('conexion-realizada', 'Conectado');

        	//RECIBO LOS DATOS DE LOS SENSORES
        	//Cuando recibo datos del termomentro..
            socket.on('data-atmospherics', function(data){
                //TODO: guardar el BBDD y enviar al cliente correspondiente.
                console.log('data-atmospherics : '+data);
                atmospherics.postDocuments(orden, atmospherics.cbPostDocument);

            });

        	//Cuando recibo datos de los inclinometros (juntos en JSON)...
            //TODO: es posible que no insterese juntar los datos en el micro y que lleguen en un JSON a guardar aquí y rebotar a los clientes.
        	socket.on('data-inclinometers', function(data){
        		//TODO: guardar el BBDD y enviar al cliente correspondiente.
        		console.log('data-inclinometers : '+data);
                inclinometer.postDocuments(orden, inclinometer.cbPostDocument);

        	});

            //Cuando recibo datos las fuerzas...
            socket.on('data-strongs', function(data){
        		//TODO: guardar el BBDD y enviar al cliente correspondiente.
        		console.log('data-strongs : '+data);
                strongs.postDocuments(orden, strongs.cbPostDocument);

        	});

            //Cuando recibo datos de distancias...
            socket.on('data-distances', function(data){
        		//TODO: guardar el BBDD y enviar al cliente correspondiente.
        		console.log('data-distances : '+data);
                distances.postDocuments(orden, distances.cbPostDocument);

        	});


        	//Cuando se desconecta el sensor...
        	socket.on('disconnect', function () {
                //Haré algo al respecto, si pogo io.emit envío a todos los usuarios
                socket.emit('sensor disconnected'); //En este caso me interesará enviar a los clientes usuarios no sensores.
            });

        }

    }
}
