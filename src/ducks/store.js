import { createStore } from 'redux';

const initialState = {
	user: {}
}

export const UPDATE_USER = "UPDATE_USER"

function reducer(state = initialState, action) {
	const { payload, type } = action;
	switch (type) {
		case UPDATE_USER:
			console.log(payload);
			return { ...state, user: payload }
		default:
			return state;
	}
}



export default createStore(reducer);