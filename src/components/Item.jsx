import React, { useState } from 'react';
import axios from 'axios';

export default function name({ img, desc, name, price, id, getProducts }) {
	const [edit, setEdit] = useState(false);
	const [input, setInput] = useState('');

	function parseCurrency(price) {
		let strArray = price.toString().split('');
		strArray.splice((price.toString().length - 2), 0, '.');
		return '$' + strArray.join('');
	}

	function submit() {
		axios.put(`/api/products?id=${id}`, { desc: input })
			.then(() => {
				setEdit(false);
				getProducts();
			});
	};

	function deleteIt() {
		axios.delete(`/api/products?id=${id}`)
			.then(() => {
				getProducts();
			});
	}

	return (
		<div className="item">
			<h1>{name}{"\t"}<span>{parseCurrency(price)}</span></h1>
			<img src={img} alt="Product" />
			{edit
				? <input style={{ display: edit ? '' : 'none' }}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Description" />
				: <p>{desc}</p>
			}
			{edit
				? <div>
					<button onClick={submit}>Submit</button>
					<button onClick={() => setEdit(false)}>Cancel</button>
				</div>
				: <button onClick={() => setEdit(!edit)}>Edit</button>
			}
			<button onClick={deleteIt}>Delete</button>
		</div>
	)
};
