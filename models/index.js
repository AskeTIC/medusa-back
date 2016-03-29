//MODULOS DE TERCEROS
//Objeto cliente que trae el propio módulo oficial de MongoDB
var MongoClient = require('mongodb').MongoClient;

//MODULOS PROPIOS
//funcion constructora de BBDD client
var Db = require('./ddbb');
console.log(Db);

//funciones constructoras de modelos especificos.
var DbModelOrders = require('./orders');
var DbModelSensors = require('./sensors');
var DbModelConfig = require('./config');

//MODULOS A EXPORTAR
var orders = {};
var sensors = {};
var config = {};

//crear objeto bbdd para los modelos.
//TODO: Singleton pattern //TOKNOW: Puede que no sea necesario, puesto que importas los objetos ya creados.
var mongoDB = "mongodb://localhost:27017/medusa";
var database = new Db(MongoClient, mongoDB);
var dbPromise = database.ownConnect();
console.log(dbPromise);
dbPromise.then(function(db){
    console.log("conexion a la BBDD realizada con éxito");
    console.log(db);

    //TODO: Algunos modelos específicos podrían usar BBDD diferentes, pero solo hay una instancia de cada una (por ahora).
    //MODELOS ESPECIFICOS.
    //Modelos y sus colecciones.
    config.config        = new DbModelConfig("config", db);
    orders.orders        = new DbModelOrders("orders", db);
    sensors.atmospherics = new DbModelSensors("atmospherics", db);

    //un objeto por cada collección a usar.
    //TODO: pasarle un array y que exporte las variables en el contexto, para haver solo una invocación a un método.
    /*
    var atmospherics   = new DbModelSensors("atmospherics");
    var distances      = new DbModelSensors("distances");
    var strongs        = new DbModelSensors("strongs");
    var inclinometers  = new DbModelSensors("inclinometers");
    var flowmeters     = new DbModelSensors("flowmeters");
    var microwaves     = new DbModelSensors("microwaves");
    var consumptions   = new DbModelSensors("consumptions");
    var anemometers    = new DbModelSensors("anemometers");
    var lapCounters    = new DbModelSensors("lapcounters");
    var guides         = new DbModelSensors("guides");
    */

});
dbPromise.catch(function(err){
    console.log(err);
});

module.exports.config = config ;
module.exports.orders = orders ;
module.exports.sensors = sensors ;
