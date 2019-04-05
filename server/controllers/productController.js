module.exports = {
	read: (req, res) => {
		const db = req.app.get('db');

		db.read()
			.then(products => {
				res.status(200).send(products);
			})
			.catch(err => console.log(`controller.read: ${err}`));
	},
	create: (req, res) => {
		const db = req.app.get('db');

		db.create(req.body)
			.then(() => {
				res.sendStatus(201);
			})
			.catch(err => console.log('errors!!!!!'));
	},
	update: async (req, res) => {
		const db = req.app.get('db');
		const { id } = req.query;
		const { desc } = req.body
		await db.product.save({ product_id: id, description: desc }).catch(err => res.sendStatus(500));
		res.sendStatus(201);
	},
	delete: async (req, res) => {
		const db = req.app.get('db');

		await db.delete(req.query.id);
		res.sendStatus(200);
	}
}