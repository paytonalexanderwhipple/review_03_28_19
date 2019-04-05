import React, { Component } from 'react';
import store from '../ducks/store';
import axios from 'axios';

export default class Entry extends Component {

	state = {
		name: '',
		img: '',
		desc: '',
		price: 0,
		user: store.getState()
	}

	handleInput = (event) => {
		const { id, value } = event.target;
		this.setState({ [id]: value });
	}

	submit = (e) => {
		e.preventDefault();
		axios.post('/api/products', this.state)
			.then(res => {
				this.setState({
					name: '',
					img: '',
					desc: '',
					price: 0
				})
				this.props.history.push('/');
			})
			.catch(err => console.log('bad things are happening'));
	}

	componentDidMount = () => {
		console.log(this.state.user);
		if (!this.state.user.user.isadmin) {
			this.props.history.push('/');
		}
	}

	render() {
		return (
			<>
				<form onSubmit={this.submit}>
					<label htmlFor="name">Name:</label>
					<input onChange={this.handleInput} type="text" id='name' />
					<label htmlFor="img">Image:</label>
					<input onChange={this.handleInput} type="text" id='img' />
					<label htmlFor="desc">Description:</label>
					<input onChange={this.handleInput} type="text" id='desc' />
					<label htmlFor="price">Price:</label>
					<input onChange={this.handleInput} type="number" id='price' />
					<button type="submit">Submit</button>
				</form>
			</>
		)
	}
}
