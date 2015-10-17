//MODELO GENERAL DE BBDD

//Nuestro objeto Temp recibe la cadena de conexión. Ahora en routes.js que podría estar en el módulo específico.
module.exports = function Database(mongoDB){
	//REQUERIMOS MODULOS DE TERCEROS
	//Objeto cliente que trae el propio módulo oficial de MongoDB
	var MongoClient = require('mongodb').MongoClient;

	return{
        //ENVOLVEMOS LA FUNCION -connect- DE MONGO CON UNA NUESTRA PARA TRATAR ERROES Y COLECCIONES.
        connect: function(cbDesdeLosModelosEspecificos){ //TODO: ya estamos en los modelos, cambiar nombre.
            //Ejecutamos la función -connect- de mongo...
            MongoClient.connect(mongoDB,function(err, db){
                //...si hay error lo pasamos como parámentro al
                //callback que nos pasan a connect desde los modelos.
                if(err){
                    //Al callback le pasamos el error y null por que no hay colección.
                    cbDesdeLosModelosEspecificos(err,null);
                }
                //...si no hay error notificamos a la consola y...
                console.log("Conectado a:" + mongoDB);
                //guardamos la colección que vamos a usar, no hace falta que lo hagamos
                //de manera asincrona por que no interactua con la DDBB y nos bloquea nada.
                var collection = db.collection(colName);
                //Al callback le pasamos null por que no hay error y la colección.
                cbDesdeLosModelosEspecificos(null,collection);
            });
        }
	}

};
