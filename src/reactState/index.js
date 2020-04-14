// TODO: Implement a proper store. It's crude, due to a lack of knowledge.
import React, { useState } from 'react';
import { merge } from '@laufire/utils/collection';

/* State */
const Store = {
	initialState: {},
};

const init = () =>
	(Store.publish = (data) => merge(Store.initialState, data));

/* Exports */
const setup = ({ context }) => { // eslint-disable-line max-lines-per-function
	init();

	context.publish = (data) => Store.publish(data);
	context.next();

	context.root = () => {
		const [state, setState] = useState(Store.initialState);

		if(!Store.initialized) {
			Store.initialized = true;
			Store.Root = () => context.mount(context.parsed)();
			Store.publish = (data) => setState(merge(
				{}, state, data
			));
		}

		context.state = state;

		return <Store.Root />;
	};
};

export default { setup };
