var express = require('express');

var app = express();

var exphbs = require('express-handlebars');

app.use(express.static("public"))

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

var MURI = 'mongodb://jadb:1234@ds155080.mlab.com:55080/varisjengi/tuotteet';
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

	
	Tuote.find({},function(err, tuotteet){
		var context = {
			tuotteet: tuotteet.map(function(tuote){
				return{
				nimi: tuote.nimi,
				kategoria: tuote.kategoria,
				hinta: tuote.hinta,
				}
			})
		};

		
			res.render('tuotteet',context);
	});
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

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
			type: 'OAuth2',
            user: 'jalkahoitola.amalia@gmail.com',
            clientId: ' 500544382944-uu5oj0s7m0sg40vp0l8askbmfdj2lljd.apps.googleusercontent.com ',
            clientSecret: ' i7Rgt-PiFhCY5kKdKxJoWXnl ',
            refreshToken: '1/-juzPAepWprNAkUlPaweQYiydt3V7wvCEed7ypoI6lQL3no1EMWUDBDw-KOq-lVY'
    }
})

var mailOptions = {
    from: 'jalkahoitola.amalia@gmail.com',
    to: 'jalkahoitola.amalia@gmail.com',
    subject: 'Nodemailer test',
    text: 'Hello World!!'
}

transporter.sendMail(mailOptions, function (err, res) {
    if(err){
        console.log('Error');
    } else {
        console.log('Email Sent');
    }
})


/*var nodemailer = require('nodemailer');

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
}*/
