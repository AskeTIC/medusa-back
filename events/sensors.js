var DbModelSensors = require('../models/sensors');


module.exports = function Sensors(){

    //un objeto por cada collección a usar.
    var atmospherics = new DbModelSensors("atmospherics");
    var distances = new DbModelSensors("distances");
    var strongs = new DbModelSensors("strongs");
    var inclinometers = new DbModelSensors("inclinometers");
    var flowmeters = new DbModelSensors("flowmeters");
    var microwaves = new DbModelSensors("microwaves");
    var consumptions = new DbModelSensors("consumptions");
    var anemometers = new DbModelSensors("anemometers");
    var lapCounters = new DbModelSensors("lapcounters");
    var guides = new DbModelSensors("guides");


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
                //TODO: enviar al cliente correspondiente.
                console.log('data-atmospherics : '+data);
                atmospherics.postDocuments(orden, atmospherics.cbPostDocument);

            });

        	//Cuando recibo datos de los inclinometros (juntos en JSON)...
            //TODO: es posible que no insterese juntar los datos en el micro y que lleguen en un JSON a guardar aquí y rebotar a los clientes.
        	socket.on('data-inclinometers', function(data){
        		//TODO: enviar al cliente correspondiente.
        		console.log('data-inclinometers : '+data);
                inclinometer.postDocuments(orden, inclinometer.cbPostDocument);

        	});

            //Cuando recibo datos las fuerzas...
            socket.on('data-strongs', function(data){
        		//TODO: enviar al cliente correspondiente.
        		console.log('data-strongs : '+data);
                strongs.postDocuments(orden, strongs.cbPostDocument);

        	});

            //Cuando recibo datos de distancias...
            socket.on('data-distances', function(data){
        		//TODO: enviar al cliente correspondiente.
        		console.log('data-distances : '+data);
                distances.postDocuments(orden, distances.cbPostDocument);

        	});

            //Cuando recibo datos de caudalimetros..
            socket.on('data-flowmeters', function(data){
                //TODO: enviar al cliente correspondiente.
                console.log('data-flowmeters : '+data);
                flowmeters.postDocuments(orden, flowmeters.cbPostDocument);

            });

            //Cuando recibo datos de microondas..
            socket.on('data-microwaves', function(data){
                //TODO: enviar al cliente correspondiente.
                console.log('data-microwaves : '+data);
                microwaves.postDocuments(orden, microwaves.cbPostDocument);

            });

            //Cuando recibo datos de consumos..
            socket.on('data-consumptions', function(data){
                //TODO: enviar al cliente correspondiente.
                console.log('data-consumptions : '+data);
                consumptions.postDocuments(orden, consumptions.cbPostDocument);

            });

            //Cuando recibo datos de anemometros..
            socket.on('data-anemometers', function(data){
                //TODO: enviar al cliente correspondiente.
                console.log('data-anemometers : '+data);
                anemometers.postDocuments(orden, anemometers.cbPostDocument);

            });

            //Cuando recibo datos de anemometros..
            socket.on('data-anemometers', function(data){
                //TODO: enviar al cliente correspondiente.
                console.log('data-anemometers : '+data);
                anemometers.postDocuments(orden, anemometers.cbPostDocument);

            });

            //Cuando recibo datos de cuentavueltas..
            socket.on('data-lapCounters', function(data){
                //TODO: enviar al cliente correspondiente.
                console.log('data-lapCounters : '+data);
                lapCounters.postDocuments(orden, lapCounters.cbPostDocument);

            });

            //Cuando recibo datos de guias (brujula, veleta, etc)...
            socket.on('data-guides', function(data){
                //TODO: enviar al cliente correspondiente.
                console.log('data-guides : '+data);
                guides.postDocuments(orden, guides.cbPostDocument);

            });

        	//Cuando se desconecta el sensor...
        	socket.on('disconnect', function () {
                //Haré algo al respecto, si pogo io.emit envío a todos los usuarios
                socket.emit('sensor disconnected'); //En este caso me interesará enviar a los clientes usuarios no sensores.
            });

        }

    }
}
