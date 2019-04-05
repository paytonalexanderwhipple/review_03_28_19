const bcrypt = require('bcryptjs');

module.exports = {
	login: async (req, res) => {
		const db = req.app.get('db');
		const { username, password } = req.body;

		let userFound = await db.findUser([username])

		if (!userFound[0]) {
			res.status(418).send('Wrong username homie!');
			return;
		}

		let { hash } = userFound[0];

		let auth = bcrypt.compareSync(password, hash);

		if (auth) {
			req.session.user = { ...userFound[0] }
			res.status(200).send({ ...userFound[0], hash: 'DOnt touch my data you CAT!' });
		} else {
			res.status(401).send("Wrong password FOOL!");
		}
	},
	register: async (req, res) => {
		const db = req.app.get('db');
		const { color, username, password, isadmin } = req.body;

		let userFound = await db.findUser([username]);

		if (userFound[0]) {
			return res.status(418).send('Hey Bro thats not your account');
		}

		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(password, salt);

		let user = await db.createUser({ color, username, hash, isadmin });

		req.session.user = user[0];

		res.status(201).send({ ...user[0], hash: 'Dont steal my data!' });
	},
	logout: (req, res) => {

	}
}