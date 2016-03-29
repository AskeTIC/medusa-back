var orders = require('../models/index').orders;
console.log(orders);

module.exports = function Orders(orders){
    console.log(orders);

    return {

        connectionOrders: function(socket){
            //Muestro un aviso en backend
            console.log('cliente conectado desde "connectionOrders() en orders controller"!');
            //Emito al usuario conectado un evento y un mensaje
            socket.emit('conexion realizada', 'Conectado con éxito');

            //ORDENES ESPECIFICAS DESDE EL USUARIO
            //Cuando recibo el evento carga-controller...
            socket.on('carga-controller', function(orden){
                orders.orders.postDocuments(orden, orders.orders.cbPostDocuments);
                console.log('carga-controller :' + orden);
            });

            //Cuando recibo el evento desplazamiento-controller...
            socket.on('desplazamiento-controller', function(orden){
                orders.orders.postDocuments(orden, orders.orders.cbPostDocuments);
                console.log('desplazamiento-controller :' + orden);
            });

            //Cuando recibo el evento vela-controller...
            socket.on('vela-controller', function(orden){
                orders.orders.postDocuments(orden, orders.orders.cbPostDocuments);
                console.log('vela-controller :' + orden);
            });

            //Cuando recibo el evento pertiga-controller...
            socket.on('pertiga-controller', function(orden){
                orders.orders.postDocuments(orden, orders.orders.cbPostDocuments);
                console.log('Recibido evento pertiga-controller, con la data:' + orden);
            });


            //ORDENES GENERALES: SISTEMAS, ETC..
            //Cuando recibo el evento sistems-controller...
            var sistemsStatus = false;
            socket.on('sistems-controller', function(data){
                if(sistemsStatus === true){
                    socket.emit('sistems-total-up', data);//TODO: Pasarle algo? En principio creo que dependiendo la fase o ensayo quizás haya que crear algo al respecto.
                    orders.postDocuments(orden, orders.cbPostDocuments);
                    console.log(sistemsStatus);
                    sistemsStatus = false;
                }else{
                    socket.emit('sistems-total-down', data+1)//TODO: Pasarle algo?
                    orders.postDocuments(orden, orders.cbPostDocuments);
                    console.log(sistemsStatus);
                    sistemsStatus = true;
                }
            });

            //Cuando recibo el evento sistems-carena...
            var carenaStatus = false;
            socket.on('sistems-carena', function(data){
                if(status === true){
                    socket.emit('sistems-carena-up', data);//TODO: Pasarle algo? En principio creo que dependiendo la fase o ensayo quizás haya que crear algo al respecto.
                    orders.postDocuments(orden, orders.cbPostDocuments);
                    console.log(carenaStatus);
                    carenaStatus = false;
                }else{
                    socket.emit('sistems-carena-down', data+1)//TODO: Pasarle algo?
                    orders.postDocuments(orden, orders.cbPostDocuments);
                    console.log(carenaStatus);
                    carenaStatus = true;
                }
            });

            //Cuando recibo el evento sistems-heeled...
            var heeledStatus = false;
            socket.on('sistems-heeled', function(data){
                if(status === true){
                    socket.emit('sistems-heeled-up', data);//TODO: Pasarle algo? En principio creo que dependiendo la fase o ensayo quizás haya que crear algo al respecto.
                    orders.postDocuments(orden, orders.cbPostDocuments);
                    console.log(heeledStatus);
                    heeledStatus = false;
                }else{
                    socket.emit('sistems-heeled-own', data+1)//TODO: Pasarle algo?
                    orders.postDocuments(orden, orders.cbPostDocuments);
                    console.log(heeledStatus);
                    heeledStatus = true;
                }
            });

            //Cuando recibo el evento sistems-dataCapture...
            var dataCaptureStatus = false;
            socket.on('sistems-dataCapture', function(data){
                if(status === true){
                    socket.emit('sistems-dataCapture-up', data);//TODO: Pasarle algo? En principio creo que dependiendo la fase o ensayo quizás haya que crear algo al respecto.
                    orders.postDocuments(orden, orders.cbPostDocuments);
                    console.log(dataCaptureStatus);
                    dataCaptureStatus = false;
                }else{
                    socket.emit('sistems-dataCapture-own', data+1)//TODO: Pasarle algo?
                    orders.postDocuments(orden, orders.cbPostDocuments);
                    console.log(dataCaptureStatus);
                    dataCaptureStatus = true;
                }
            });

            //Cuando se desconecta el usuario...
            socket.on('disconnect', function () {
                //Haré algo al respecto, si pogo io.emit envío a todos los usuarios
                    socket.emit('user disconnected'); //En este caso me interesará avisarle de que se ha descopnectado para que vuelva a conectar. Por ejemplo
            });
        }
    }
}
