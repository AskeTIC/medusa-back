module.exports = function(){

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

    }
}
