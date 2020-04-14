// TODO: Implement a proper store. It's crude, due to a lack of knowledge.
import React, { useState, memo } from 'react';
import { equals, merge } from '@laufire/utils/collection';
import { hook } from '../core/utils';

/* State */
const Store = {
	initialState: {},
};

/* Workers */
const mountHook = (mounted, parsed) => {
	if(!parsed.hasSource)
		return mounted;

	const Memoized = memo(mounted, equals);

	return (params) => <Memoized { ...params }/>;
};

const init = () =>
	(Store.publish = (data) => merge(Store.initialState, data));

/* Exports */
const setup = ({ context }) => { // eslint-disable-line max-lines-per-function
	init();

	context.mount = hook(context.mount, mountHook);
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

		return <Store.Root { ...{ state } }/>;
	};
};

export default { setup };
