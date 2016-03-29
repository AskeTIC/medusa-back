var sensors = require('../models/index').sensors;
console.log(sensors);

//TODO: Autoejecutar la función para que recoja el objeto sensors importado. //TOKNOW: ¿¿Y se tendría la opción de pasar uno desde fuera ??
module.exports = function Sensors(sensors){
    console.log(sensors);

    return {
        // NAMESPACE '/sensors' QUE ES PARA LOS SENSORES
        // cuando se establece una conexión desde un cliente sensor...
        connectionSensors: function(socket){
            //Muestro un aviso en el backend
            console.log('Sensor conectado!');
            //Emito al sensor un evento y un mensaje para actuar en consecuencia.
            socket.emit('sensor-conectado', 'sensor!');

            //RECIBO LOS DATOS DE LOS SENSORES
            //Cuando recibo datos del termomentro..
            socket.on('data-atmospherics', function(data){
                //TODO: enviar al cliente correspondiente.
                sensors.atmospherics.postDocuments(data, sensors.atmospherics.cbPostDocuments);
                console.log('data-atmospherics : '+data);

            });

        	//Cuando recibo datos de los inclinometros (juntos en JSON)...
            //TODO: es posible que no insterese juntar los datos en el micro y que lleguen en un JSON a guardar aquí y rebotar a los clientes.
        	 socket.on('data-inclinometers', function(data){
        		//TODO: enviar al cliente correspondiente.
                sensors.inclinometer.postDocuments(data, sensors.inclinometer.cbPostDocuments);
                console.log('data-inclinometers : '+data);

        	});

            //Cuando recibo datos las fuerzas...
            socket.on('data-strongs', function(data){
        		//TODO: enviar al cliente correspondiente.
                sensors.strongs.postDocuments(data, sensors.strongs.cbPostDocuments);
                console.log('data-strongs : '+data);

    	    });

            //Cuando recibo datos de distancias...
            socket.on('data-distances', function(data){
        		//TODO: enviar al cliente correspondiente.
                sensors.distances.postDocuments(data, sensors.distances.cbPostDocuments);
                console.log('data-distances : '+data);

        	});

            //Cuando recibo datos de caudalimetros..
            socket.on('data-flowmeters', function(data){
                //TODO: enviar al cliente correspondiente.
                sensors.flowmeters.postDocuments(data, sensors.flowmeters.cbPostDocuments);
                console.log('data-flowmeters : '+data);

            });

            //Cuando recibo datos de microondas..
            socket.on('data-microwaves', function(data){
                //TODO: enviar al cliente correspondiente.
                sensors.microwaves.postDocuments(data, sensors.microwaves.cbPostDocuments);
                console.log('data-microwaves : '+data);

            });

            //Cuando recibo datos de consumos..
            socket.on('data-consumptions', function(data){
                //TODO: enviar al cliente correspondiente.
                sensors.consumptions.postDocuments(orden, sensors.consumptions.cbPostDocuments);
                console.log('data-consumptions : '+data);

            });

            //Cuando recibo datos de anemometros..
            socket.on('data-anemometers', function(data){
                //TODO: enviar al cliente correspondiente.
                sensors.anemometers.postDocuments(data, sensors.anemometers.cbPostDocuments);
                console.log('data-anemometers : '+data);

            });

            //Cuando recibo datos de cuentavueltas..
            socket.on('data-lapCounters', function(data){
                //TODO: enviar al cliente correspondiente.
                sensors.lapCounters.postDocuments(orden, sensors.lapCounters.cbPostDocuments);
                console.log('data-lapCounters : '+data);

            });

            //Cuando recibo datos de guias (brujula, veleta, etc)...
            socket.on('data-guides', function(data){
                //TODO: enviar al cliente correspondiente.
                sensors.guides.postDocuments(orden, sensors.guides.cbPostDocuments);
                console.log('data-guides : '+data);

            });

        	//Cuando se desconecta el sensor...
        	socket.on('disconnect', function () {
                //Haré algo al respecto, si pogo io.emit envío a todos los usuarios
                socket.emit('sensor disconnected'); //En este caso me interesará enviar a los clientes usuarios no sensores.
                console.log('sensor desconectado');
            });

        }

    }
}
