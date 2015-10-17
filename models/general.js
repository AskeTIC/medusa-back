//MODELO GENERAL DE BBDD
//REQUERIMOS MODULOS DE TERCEROS
//Objeto cliente que trae el propio módulo oficial de MongoDB
var MongoClient = require('mongodb').MongoClient;
var mongoDB = "mongodb://localhost:27017/medusa";

//Nuestro objeto Db recibe la cadena de conexión a la BBDD.
var Db = function(mongoDB){

        //ENVOLVEMOS LA FUNCION -connect- DE MONGO CON UNA NUESTRA PARA TRATAR ERROES Y COLECCIONES.
        return {

            connect : function(colName, cbDesdeLosModelosEspecificos){ //Este es el callback que quiero ejecutar cunado se realice la conexión correctamente.
                //Ejecutamos la función -connect- de mongo y le pasamos la mongoDB y un callback que me pide para cuando se realiza la conexón correctamente, la cual me devuelve un error si lo hay y la database.
                MongoClient.connect(mongoDB,function(err, database){
                    //...si hay error lo pasamos como parámentro al callback que nos pasan a connect desde los modelos para que hagan con el lo que quieran.
                    if(err){
                        //Al callback le pasamos el error y null por que no hay colección.
                        cbDesdeLosModelosEspecificos(err,null);
                    }
                    //...si no hay error notificamos a la consola y...
                    console.log("Conectado a:" + mongoDB);
                    console.log(colName); //CORRECTO, ME COGE LA COLLECION!
                    //Usando el objeto database que me devuelve la funcion connect() de MongoClient, guardamos la colección que vamos a usar.
                    var collection = database.collection(colName);//no hace falta que lo hagamos de manera asincrona por que no interactua con la DDBB y no nos bloquea nada.
                    console.log(collection);
                    //Y ejecutamos el callback de nuetra funcion connect() (patron DECORATOR)y le pasamos null por que no hay error y la colección.
                    cbDesdeLosModelosEspecificos(null,collection);
                });
            }
        }
};

var db = new Db(mongoDB);
console.log("general:"+db.connect);

module.exports = db;
