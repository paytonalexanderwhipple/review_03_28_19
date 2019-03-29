require('dotenv').config();
const { PORT, CONNECTION_STRING } = process.env;

const express = require('express');
const massive = require('massive');
const ctrl = require('./controller/controller.js');

const app = express();

// --- TOP LEVEL MIDDLEWARE --- //

app.use(express.json());

massive(CONNECTION_STRING)
	.then(db => {
		app.set('db', db);
		// --- I CAN HEAR YOU! --- //
		app.listen(PORT, () => console.log(`Something clever on PORT:${PORT}`));
	})

// --- ENDPOINTS --- //

app.get('/api/products', ctrl.read);
app.post('/api/products', ctrl.create);
app.put('/api/products', ctrl.update);
app.delete('/api/products', ctrl.delete)