//MODELO DE DISTANCIAS (sensor de distancia)

//Nuestro objeto Temp recibe la cadena de conexión. Ahora en routes.js que podría estar en el módulo específico.
module.exports = function Distances(mongoDB){
	//REQUERIMOS MODULOS DE TERCEROS
	//Objeto cliente que trae el propio módulo oficial de MongoDB
	var MongoClient = require('mongodb').MongoClient;
	//String con la colección que vamos a usar.
	var colName = "distances";

	//ENVOLVEMOS LA FUNCION -connect- DE MONGO CON UNA NUESTRA PARA TRATAR ERROES Y COLECCIONES.
	/*TODO: pasarla a un archivo models.js para las funciones abstractas e insertar en cada modelo,
	hará que pasarle la colName como parámetro e instanciar el cliente también en dicho archivo*/
	function connect(cbDesdeLosModelos){
		//Ejecutamos la función -connect- de mongo...
		MongoClient.connect(mongoDB,function(err, db){
			//...si hay error lo pasamos como parámentro al
			//callback que nos pasan a connect desde los modelos.
			if(err){
				//Al callback le pasamos el error y null por que no hay colección.
				cbDesdeLosModelos(err,null);
			}
			//...si no hay error notificamos a la consola y...
			console.log("Conectado a:" + mongoDB);
			//guardamos la colección que vamos a usar, no hace falta que lo hagamos
			//de manera asincrona por que no interactua con la DDBB y nos bloquea nada.
			var collection = db.collection(colName);
			//Al callback le pasamos null por que no hay error y la colección.
			cbDesdeLosModelos(null,collection);
		})
	};

	return{
		//devolvemos estos 2 métodos que nos llaman desde el router.js
		getDistances: function(cbDesdeElEnrutador){
			//Llamamos a nuestra función connect y le pasamos un parametros, que será...
			//callback que es llamado desde el error o no error de arriba
			connect(function (err, collection){
				//Le pasamos otro método callback que recibimos desde el enrutador...
				//cuando termine el método find() y toArray() para no bloquear a nadie.
				collection.find().toArray(cbDesdeElEnrutador);
			})

		},

		postDistances: function(doc,cbDesdeElEnrutador){
			connect(function (err,collection){
				collection.insert(doc,cbDesdeElEnrutador);
			})
		}

	};

};
