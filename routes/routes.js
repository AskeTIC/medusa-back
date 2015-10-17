//REQUERIMOS MODULOS DE TERCEROS
var express = require('express');
//instanciamos el objeto enturador que trae express para pasarselo en el index.js para que lo use.
var router = express.Router();

//REQUERIMOS MODULOS PROPIOS
var errors = require('../utils/errors');

//RUTAS
router.route('/')
	.get(function(req, res){
		console.log('cliente servido!');//TODO: no aparece en consola.
		res.sendFile('public/index.html');
	});

router.route('/test')
	.get(function(req, res, next) {
  		res.status(200).send("Hello World!");
	});

//de momento vamos a trabajar la temperatura con REST para probar bien mongoDB
var atmospherics = require("../models/atmospherics");
console.log(atmospherics.postAtmospheric);
//var atmospherics = new Atmospherics();
router.route('/atmospherics')
	.get(function(req, res, next){
		//obtener la temperatura
		atmospherics.getAtmospheric(function(err, docs){ //Este es el cbDesdeElEnrutador
			if(err){
				errors.tratarError(err, res);
			}
			res.json(docs);
		});
	})
	.post(function(req, res, next){
		//guardar la temperatura
		var doc = req.body;
		//TODO:comprobar si existe la colleción y crearla si no existe.
		atmospherics.postAtmospheric(doc, function(err, doc){ //Este es el cdDesdeElEnrutador
			if(err){
				console.log('error desde el enrutador');
				errors.tratarError(err, res);
			}
			res.status(200).json(doc);
		});
	})

//exportamos el enrutador
module.exports.router = router;
