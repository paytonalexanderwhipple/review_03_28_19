import React, { useState } from 'react';
import axios from 'axios';

export default function name({ img, desc, name, price, id }) {
	const [edit, setEdit] = useState(false);
	const [input, setInput] = useState('');

	function submit() {
		axios.put(`/api/products?id=${id}`, { desc: input })
			.then(() => { });
	};

	function deleteIt() {
		axios.delete(`/api/products?id=${id}`);
	}

	return (
		<>
			<h1>{name}<span>{price}</span></h1>
			<img src={img} alt="Product" />
			<p>{desc}</p>
			<input style={{ display: edit ? '' : 'none' }}
				onChange={(e) => setInput(e.target.value)} />
			{edit
				? <button onClick={submit}>Submit</button>
				: <button onClick={() => setEdit(!edit)}>Edit</button>
			}
			<button onClick={deleteIt}>Delete</button>
		</>
	)
};
