import React, { Component } from 'react';
import axios from 'axios';

export default class Entry extends Component {

	state = {
		name: '',
		img: '',
		desc: '',
		price: 0
	}

	handleInput = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
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

	render() {
		return (
			<>
				<form onSubmit={this.submit}>
					<label htmlFor="name">Name</label>
					<input onChange={this.handleInput} type="text" name='name' />
					<label htmlFor="img">Image</label>
					<input onChange={this.handleInput} type="text" name='img' />
					<label htmlFor="desc">Description</label>
					<input onChange={this.handleInput} type="text" name='desc' />
					<label htmlFor="price">Price</label>
					<input onChange={this.handleInput} type="number" name='price' />
					<button type="submit">Submit</button>
				</form>
			</>
		)
	}
}
