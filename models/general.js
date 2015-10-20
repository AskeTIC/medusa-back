//MODEL GENERALE

module.exports = function ModelGeneral(){

    this.cbPostDocuments = function(err, data){ //Este es el cdDesdeElEnrutador
        if(err){
            console.log('error al insertar el documento: '+data);
            errors.tratarError(err, res);// modificar para tratar basado en WebSocket
        }
        console.log('insertado el documento: '+data);
    }


};
