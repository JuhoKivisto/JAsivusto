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

app.get('/tietoja', function (req, res) {

	//res.type('text/html');
	//res.send('<h1>Hauskoja tietoja riemulomista</h1>');
	res.render('tietoja');
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