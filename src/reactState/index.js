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
		store.publish = (data) => setState(merge(
			{}, store.state, data
		));
	}
};

/* Exports */
const setup = ({ context }) => {
	const store = {
		publish: (data) => merge(store.state, data),
		state: {},
		root: context.root,
	};

	context.publish = (data) => store.publish(data);
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
