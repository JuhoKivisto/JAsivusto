var mongoose = require('mongoose');
var tuoteSchema = mongoose.Schema({
	nimi: String,
	kategoria : String,
	hinta : String
});

tuote = mongoose.model('tuote',tuoteSchema);
module.exports = tuote;