var express = require('express');

var app = express();

var exphbs = require('express-handlebars');

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.set('port', process.env.PORT || 3000);

var mongoose = require('mongoose');
var Tuote = require('./models/tuote.js');
var opts = {
	server: {
		socketOptions: { keepAlive: 120 }
	}
};

var MURI = 'mongodb://jadb:1234@ds155080.mlab.com:55080/varisjengi'
//mongoose.connect('mongodb://jadb:1234@ds155080.mlab.com:55080/varisjengi', opts);
//mongoose.connect('mongodb://jas:1234@ds161890.mlab.com:61890/jasivut',opts);
mongoose.connect(MURI, opts);
//var db = mongoose.connection;



Tuote.find(function (err, tuotteet) {
	if (err) {
		console.err(err);
	}
	if (tuotteet.length) {
		return;
	}
});

app.get('/', function (req, res) {
	res.render('home');
})
app.get('/palvelut', function (req, res) {
	res.render('palvelut');
});

app.get('/Tuotteet', function (req, res) {
	Tuote.find(function(doc)
	{
		res.render('tuotteet');
	})
	
});
app.get('/ajanvaraus', function (req, res) {
	res.render('ajanvaraus');
});

app.use(function (req, res) {

	res.type('text/html');
	res.status(404);
	res.send('<h1>Virhe 404 - pyytämääsi resurssia ei löytynyt</h1>');
});

app.use(function (err, req, res, next) {
	console.log(err, stack);
	res.type('text/html');
	res.status(500);
	res.send('<h1>Virhe 500 - Palvelinpuolen virhe</h1>');
});

app.listen(app.get('port'), function () {
	console.log('Web-palvelin käynnissä http:\\localhost:' +
		app.get('port') + '; Sammuta Ctrl-C -yhdistelmällä');
})

// email ratkaisu

var nodemailer = require('nodemailer');

var router = express.Router();
app.use('/ajanvaraus', router);
router.post('/', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'jalkahoitola.amalia@gmail.com', // Your email id
			pass: 'tefa1965' // Your password
		}
	});
}