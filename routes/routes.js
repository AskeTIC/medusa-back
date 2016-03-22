//REQUERIMOS MODULOS DE TERCEROS
var express = require('express');
//instanciamos el objeto enturador que trae express para pasarselo en el index.js para que lo use.
var router = express.Router();

//REQUERIMOS MODULOS PROPIOS
var errors = require('../utils/errors');

//RUTAS
router.route('/')
	.get(function(req, res){
		console.log('cliente servido desde ruta / tipo get() !');//TODO: no aparece en consola.
		//res.sendFile('public/index.html');
	});

router.route('/test')
	.get(function(req, res, next) {
  		res.status(200).send("Hello World!");
	});

router.route('/users')
	.get(function(req, res, next){
		//TODO: Obtener listado usuarios

	})
	.post(function(req, res, next){
		//TODO:guardar usuarios
	});

//exportamos el enrutador
module.exports.router = router;
