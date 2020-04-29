// TODO: Implement proper state-management. It's crude, due to a lack of knowledge.
import React, { useState } from 'react';
import { merge } from '@laufire/utils/collection';

/* Tasks */
const init = (
	dummy, store, setState
) => {
	if(!store.initialized) {
		store.initialized = true;
		store.Root = () => store.root();
		store.updateState = (data) => setState(merge(
			{}, store.state, data
		));
	}
};

/* Exports */
const setup = ({ context }) => {
	const store = {
		state: {},
		root: context.root,
		updateState: (data) => merge(store.state, data),
	};

	context.updateState = (data) => store.updateState(data);

	context.root = () => {
		const [state, setState] = useState(store.state);

		init(
			context, store, setState
		);

		merge(store.state, state);

		context.state = state;

		return <store.Root />;
	};

	context.next();
};

export default { setup };
