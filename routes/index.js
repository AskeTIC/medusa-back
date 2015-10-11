//REQUERIMOS MODULOS DE TERCEROS
var express = require('express');
//instanciamos el objeto enturador que trae express.
var router = express.Router();

//REQUERIMOS MODULOS PROPIOS
var util = require('../utils/utils');
var mongoDB = "mongodb://localhost:27017/sensors";
var Temp = require("../models/temp.js");
var temp = new Temp(mongoDB);

//RUTAS
router.route('/temp')
	.get(function(req, res, next){
		//obtener la temperatura
		temp.getTemp(function(err, docs){
			if(err){
				util.tratarError(err, res);
			}
			res.json(docs);
		});
	})
	.post(function(req, res, next){
		//guardar la temperatura
		var doc = req.body;
		temp.postTemp(doc, function(err, docs){
			if(err){
				util.tratarError(err, res);
			}
			res.status(200).json(doc);
		});
	})

//exportamos el enrutador
module.exports.router = router;
