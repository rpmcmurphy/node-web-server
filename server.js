const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} ${req.method} ${req.url}`;

	fs.appendFileSync('server.log', log + '\n');
	console.log();
	next();
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs');
	next(); // no next, all blocked next;
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {

	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my site'
	});


	// res.send('<h1>Hello</h1>');
	/*res.send({
		name: 'Bello',
		links: [
			'Google',
			'Baalo'
		]
	});*/
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errMsg: 'Unable to get any!'
	});
});

app.listen(port, () => {
	console.log(`Server is at port ${port}`);
});