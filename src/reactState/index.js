// TODO: Implement proper state-management. It's crude, due to a lack of knowledge.
import React, { useState } from 'react';
import { merge } from '@laufire/utils/collection';

/* Tasks */
const init = (
	context, store, setState
) => {
	if(!store.initialized) {
		store.initialized = true;
		store.Root = () => context.mount(context.structure)();
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
	};

	context.publish = (data) => store.publish(data);
	context.next();

	context.root = () => {
		const [state, setState] = useState(store.state);

		init(
			context, store, setState
		);

		merge(store.state, state);

		context.state = state;

		return <store.Root />;
	};
};

export default { setup };
