//REQUERIMOS MODULOS DE TERCEROS
var ModelGeneral = require('./general');

module.exports = function DbModelSensors(colName, database){
    //CONSTRUCCIÓN DEL OBJETO
    //atributos privados
    this.database = database;
    this.collection = database.collection(colName);
    //heredamos los métodos de ModelGeneral
    ModelGeneral.apply(this);
    //métodos públicos
    this.getDocuments = function (cbDesdeElControlador){
            //TODO: Parece que ya no hará falta el connecto, puesto que está abierta siempre.
    		//Llamamos a nuestra función connect() y la pasamos el colName y definimos el callback que queremos que se ejecute cuando se realice la conexión.
    		database.connect(colName,function (err, collection){

    			//callback desde el enrutado para ejecutar cuando termine el método find() y toArray() para no bloquear a nadie.
    			collection = collection.find().toArray(cbDesdeElControlador);
    		});

        return this;
    }
    this.postDocuments = function(doc, cbDesdeElControlador){

        //Le hago un insert() sobre la collección y le paso el callback que me pasan desde el enrutador.
        collection.insert(doc, cbDesdeElControlador);

        return this;
    }

};
