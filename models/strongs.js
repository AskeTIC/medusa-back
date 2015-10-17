//MODELO DE FUERZAS (datos de sensor de fuerza)
var generalModel = require('./general');

//Nuestro objeto Temp recibe la cadena de conexión. Ahora en routes.js que podría estar en el módulo específico.
module.exports = function Strongs(generalModel){
	//REQUERIMOS MODULOS DE TERCEROS
	//Objeto cliente que trae el propio módulo oficial de MongoDB
	var MongoClient = require('mongodb').MongoClient;
	//String con la colección que vamos a usar.
	var colName = "strongs";

	return{
		//devolvemos estos 2 métodos que nos llaman desde el router.js
		getStrong: function(cbDesdeElEnrutador){
			//Llamamos a nuestra función connect y le pasamos un parametros, que será...
			//callback que es llamado desde el error o no error de arriba
			generalModel.connect(function (err, collection){
				//Le pasamos otro método callback que recibimos desde el enrutador...
				//cuando termine el método find() y toArray() para no bloquear a nadie.
				collection.find().toArray(cbDesdeElEnrutador);
			})

		},

		postStrong: function(doc,cbDesdeElEnrutador){
			generalModel.connect(function (err,collection){
				collection.insert(doc,cbDesdeElEnrutador);
			})
		}

	};

};
