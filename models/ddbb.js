//MODEL GENERAL

//Usamos una función constructora de BBDD para poder usar más BBDD.
module.exports = function DDBB(MongoDriver, urlMongo){

    this.MongoClient = MongoDriver;
    this.mongoDB = urlMongo;

    this.ownConnect = function(client, url){

        var MongoClient = client || this.MongoClient;
        var mongoDB = url || this.mongoDB;

        return new Promise(function(fulfill, reject){
            //console.log(MongoClient); hay acceso a la variable MongoClient

            MongoClient.connect(mongoDB, cbConnect);

            //Callback que se elecuta cunado se sealize la conexión.
            function cbConnect(err, db){ //recibo err y db desde connect() de MongoClient
                try {
                    console.log("conectado a la BBDD:"+ db);
                    fulfill(db);
                } catch (err) {
                    reject(err);
                }
            }

        });
    };

};
