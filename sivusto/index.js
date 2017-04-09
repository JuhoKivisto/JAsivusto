var express = require('express');

var app = express();

var exphbs = require('express-handlebars');

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs'
}));

app.set('view engine', '.hbs');

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
	res.render('home');
})
app.get('/palvelut', function (req, res) {
	res.render('palvelut');
});

app.get('/Tuotteet', function (req, res) {
	res.render('tuotteet');
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