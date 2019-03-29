import React, { Component } from 'react';
import axios from 'axios';
import Item from './Item.jsx';

export default class Display extends Component {

	state = {
		items: [],
	}

	componentDidMount = () => {
		axios.get('/api/products')
			.then(res => {
				this.setState({ items: res.data })
			})
			.catch(err => console.log('error!!!'));
	}

	render() {
		return (
			<>
				{this.state.items.map(item => <Item key={item.product_id} id={item.product_id} img={item.image_url} desc={item.description} price={item.price} name={item.name} />)}
			</>
		)
	}
}
