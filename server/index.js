require('dotenv').config();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const express = require('express');
const session = require('express-session');
const massive = require('massive');
const pCtrl = require('./controllers/productController.js');
const aCtrl = require('./controllers/authController.js');

const app = express();

// --- TOP LEVEL MIDDLEWARE --- //

app.use(express.json());

app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

massive(CONNECTION_STRING)
	.then(db => {
		app.set('db', db);
		// --- I CAN HEAR YOU! --- //
		app.listen(SERVER_PORT, () => console.log(`Something clever on PORT:${SERVER_PORT}`));
	});

// --- ENDPOINTS --- //


// products
app.get('/api/products', pCtrl.read);
app.post('/api/products', pCtrl.create);
app.put('/api/products', pCtrl.update);
app.delete('/api/products', pCtrl.delete);

// Auth
app.post('/api/auth/register', aCtrl.register);
app.post('/api/auth/login', aCtrl.login);
