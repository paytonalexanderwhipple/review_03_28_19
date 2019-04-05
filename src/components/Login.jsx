import React, { useState } from 'react';
import axios from 'axios';
import store, { UPDATE_USER } from '../ducks/store';

export default function Login({ history }) {
	const [color, setColor] = useState('#333333');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isadmin, setAdmin] = useState(false);

	function login() {
		axios.post('/api/auth/login', { username, password })
			.then(res => {
				history.push('/');
				store.dispatch({
					type: UPDATE_USER,
					payload: res.data,
				});
			}).catch(err => alert(err.response.request.response))
	}

	function register() {
		axios.post('/api/auth/register', { color, username, password, isadmin })
			.then(res => {
				history.push('/');
				store.dispatch({
					type: UPDATE_USER,
					payload: res.data,
				});
			}).catch(err => alert(err.response.request.response))
	}

	return (
		<>
			<form>
				<label htmlFor="username">Username:</label>
				<input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
				<label htmlFor="password">Password:</label>
				<input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
				<div className='flex'>
					<div>
						<label htmlFor="color">Color:</label>
						<input type="color" id='color' value={color} onChange={(e) => setColor(e.target.value)} />
					</div>
					<div>
						<label htmlFor="admin">Admin:</label>
						<input type="checkbox" checked={isadmin} id="admin" onChange={(e) => setAdmin(e.target.checked)} />
					</div>
				</div>
				<button onClick={login}>Login</button>
				<p>Don't have an account?<span className='link' onClick={register}>Register</span> </p>
			</form>
		</>
	)
};
