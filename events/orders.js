module.exports = function Orders(){

    return {

        connectionOrders: function(socket){
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
            var status = false;
            socket.on('sistems-controller', function(data){
                if(status === true){
                    socket.emit('sistems-up', data);//TODO: Pasarle algo? En principio creo que dependiendo la fase o ensayo quizás haya que crear algo al respecto.
                    console.log(status);
                    status = false;
                }else{
                    socket.emit('sistems-down', data+1)//TODO: Pasarle algo?
                    console.log(status);
                    status = true;
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
