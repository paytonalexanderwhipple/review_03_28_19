import React, { Component } from 'react';
import axios from 'axios';
import Item from './Item.jsx';

export default class Display extends Component {

	state = {
		items: [],
	}

	componentDidMount = () => {
		this.getProducts();
	}

	getProducts = () => {
		axios.get('/api/products')
			.then(res => {
				this.setState({ items: res.data })
			})
			.catch(err => console.log('error!!!'));
	}

	render() {
		return (
			<div className='display'>
				{this.state.items.map(item => <Item key={item.product_id} getProducts={this.getProducts} id={item.product_id} img={item.image_url} desc={item.description} price={item.price} name={item.name} />)}
			</div>
		)
	}
}
