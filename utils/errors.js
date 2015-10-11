module.exports.tratarError = function(err, res){
	console.log(err);
	if(err) res.send(500, err);
}
