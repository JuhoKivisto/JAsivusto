var mongoose = require('mongoose');
var tuoteSchema = mongoose.Schema({
	nimi: String,
	kategoria : String,
	hinta : String
});

Tuote = mongoose.model('Tuote',tuoteSchema);
module.exports = Tuote;