//MODELO DE ESTACION METEOROÓGICA (sensor o sensores meteorológicos)
var db = require('./general');

//Nuestro objeto Temp recibe la cadena de conexión. Ahora en routes.js que podría estar en el módulo específico.
var Atmospherics = function (db){
	//REQUERIMOS MODULOS DE TERCEROS
	//Objeto cliente que trae el propio módulo oficial de MongoDB
	var MongoClient = require('mongodb').MongoClient;
	//String con la colección que vamos a usar.
	var colName = "atmospherics";

	//devolvemos estos 2 métodos que nos llaman desde el router.js
	this.getAtmospheric = function(cbDesdeElEnrutador){
		//Llamamos a nuestra función connect() y la pasamos el colName y definimos el callback que queremos que se ejecute cuando se realice la conexión.
		db.connect(colName,function (err, collection){ //Este es el cbDesdeLosModelosEspecificos
			//Le pasamos otro método callback que recibimos desde el enrutador...
			//cuando termine el método find() y toArray() para no bloquear a nadie.
			collection.find().toArray(cbDesdeElEnrutador(err, doc));
		});

	};

	this.postAtmospheric = function(doc,cbDesdeElEnrutador){
		//Le pasamos la colName y un callback para ejecutar cuando se realice la conexión, el cual recibirá el posible error y la colleción.
		//Se lo pasamos a la funcion connect() nuestra (patron DECORATOR) que nos sirve para envolver la funcion connect() de MongoCliente y controlar algunas cosas que esta no controla.
		db.connect(colName, function (err, collection){ //Este es el cbDesdeLosModelosEspecificos
			//si hay error...
			if(err){
				console.log('error al realizar la conexión a la BBDD');
				errors.tratarError(err, res);
			}
			console.log('conexion a la BBDD realizada con éxito');
			//Como la conexión es un éxito hago la inserción y le paso el callback que me pasan desde el enrutado y que quieren ejecutar cuando se inserten los datos.
			//QUE ES A SU VEZ EL CALLBACK QUE HAY QUE PASAR AL METODO insert() Y YA RECIBE EL LOS ARGUMENTOS ?????
			//TODO: mirar si ha cambiado, parece que si por lo que veo en la API, no inserta automaticamente el _id: xxxxx desde la shell si lo hace.
			collection.insert(doc, cbDesdeElEnrutador);//Le paso el error y el documento, que los recibo en el callback de connect()
		});
	};

};

var atmospherics = new Atmospherics(db);
console.log(atmospherics.postAtmospheric);

module.exports = atmospherics;
