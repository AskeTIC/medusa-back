//REQUERIMOS MODULOS DE TERCEROS
//Objeto cliente que trae el propio módulo oficial de MongoDB
var MongoClient = require('mongodb').MongoClient;
var ModelGeneral = require('./general');

//Nuestro objeto Db recibe el string de la collección o modelo específico
//TODO: poder pasarle otra BBDD
var DbModelOrders = function(colName){
    //atributos privados
    var mongoDB = "mongodb://localhost:27017/medusa";
    var database ;
    var collection ;

    //construcción del objeto
    ownConnect(colName, cbOwnConnect );

    //heredamos los métodos de ModelGeneral
    ModelGeneral.apply(this);

    //métodos públicos
    this.getDocuments = function (cbDesdeElControlador){
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

    //métodos privados.
    //Ha de ser Hoisted para poder llamarla desde arriba, si incuye en una variable me da undefined
    function ownConnect(olName, cbOwnConnect){ //Este es el callback que quiero ejecutar cunado se realice la conexión correctamente.
        //Ejecutamos la función -connect- de mongo y le pasamos la mongoDB y un callback que me pide para cuando se realiza la conexón correctamente, la cual me devuelve un error si lo hay y la database.
        MongoClient.connect(mongoDB,cbConnect);

        //Callback que se elecuta cunado se sealize la conexión.
        function cbConnect(err, db){ //recibo err y db desde connect() de MongoClient
            //...si hay error lo pasamos como parámentro al callback que nos pasan a connect desde los modelos para que hagan con el lo que quieran.
            if(err){
                //Al callback le pasamos el error y null por que no hay colección.
                cbOwnConnect(err,null);
            }
            console.log("conectado a la BBDD:"+ db);

            //Usando el objeto database que me devuelve la funcion connect() de MongoClient, guardamos la colección que vamos a usar.
            database = db;
            collection = db.collection(colName);//no hace falta que lo hagamos de manera asincrona por que no interactua con la DDBB y no nos bloquea nada.
            //Y ejecutamos el callback de nuetra funcion connect() (patron DECORATOR)y le pasamos null por que no hay error y la colección.
            cbOwnConnect(null,collection);
        }

    }

    //callback Hoisted que se pasará a ownConnect en la construcción del objeto y se ejecutará cuando se pasará le llama en el callback de MongoClient.connect()
    function cbOwnConnect(err, collection){
        //si hay error...
        if(err){
            console.log('error al realizar la conexión a la BBDD');
            errors.tratarError(err, res);
        }
        console.log('conexion a la BBDD realizada con éxito');
    }
};
var db = new DbModelOrders('orders');
console.log(db.cbPostDocuments);
module.exports = DbModelOrders;
