// TODO: Implement proper state-management. It's crude, due to a lack of knowledge.
import React, { useState } from 'react';
import { assign, clone, merge } from '@laufire/utils/collection';

/* Tasks */
const init = (
	dummy, store, setState
) => {
	if(!store.initialized) {
		store.initialized = true;
		store.updateState = (data) => setState({ ...store.state, ...data });
	}
};

const enrichContext = (context, store) => assign(context, {
	getState: (value) => {
		const [state, setState] = useState(clone(value));

		return (newValue) => (newValue !== undefined
			? setState(newValue)
			: state);
	},
	updateState: (data) => store.updateState(data),
	Root: () => {
		const [state, setState] = useState(store.state);

		init(
			context, store, setState
		);

		store.state = state;
		context.state = state;
		const Root = store.Root();

		return <Root />;
	},
});

/* Exports */
const setup = ({ context }) => {
	const store = {
		state: {},
		Root: context.Root,
		updateState: (data) => merge(store.state, data),
	};

	enrichContext(context, store);

	context.next();
};

export default { setup };
