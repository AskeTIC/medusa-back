//MODEL GENERAL
module.exports = function ModelGeneral(){

    this.cbPostDocuments = function(err, data){ //Este es el cdDesdeElEnrutador
        if(err){
            console.log('error al insertar el documento: '+data);
            // TODO: modificar para tratar basado en WebSocket
            errors.tratarError(err, res);
        }
        console.log('insertado el documento: '+data);
    }

};
