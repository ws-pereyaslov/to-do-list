const express        = require('express');
const bodyParser     = require('body-parser');
const cookieParser   = require('cookie-parser');
const methodOverride = require('method-override');
const firebase       = require("firebase");
const config         = require('./config.js');
const app            = express();

firebase.initializeApp(config.firebase);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	next();
});

app.use(bodyParser.urlencoded({ extended: true }));

require('./app/tasks.route.js')(app);

app.listen(config.port, () => {
	console.log('Server is running! Port:' + config.port);
});