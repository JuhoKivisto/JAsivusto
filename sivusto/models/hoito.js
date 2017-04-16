var mongoose = require('mongoose');
var hoitoSchema = mongoose.Schema({
	nimi: String,
	kategoria : String,
	hinta : String
});

hoito = mongoose.model('hoito',hoitoSchema);
module.exports = hoito;