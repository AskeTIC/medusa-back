//REQUERIMOS MODULOS DE TERCEROS
var express = require('express');
//instanciamos el objeto enturador que trae express para pasarselo en el index.js para que lo use.
var router = express.Router();

//REQUERIMOS MODULOS PROPIOS
var errors = require('../utils/errors');
var mongoDB = "mongodb://localhost:27017/medusa";
var Temp = require("../models/temps");
var temp = new Temp(mongoDB);

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
router.route('/temp')
	.get(function(req, res, next){
		//obtener la temperatura
		temp.getTemp(function(err, docs){
			if(err){
				errors.tratarError(err, res);
			}
			res.json(docs);
		});
	})
	.post(function(req, res, next){
		//guardar la temperatura
		var doc = req.body;
		temp.postTemp(doc, function(err, docs){
			if(err){
				errors.tratarError(err, res);
			}
			res.status(200).json(doc);
		});
	})

//exportamos el enrutador
module.exports.router = router;
