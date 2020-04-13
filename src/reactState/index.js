// TODO: Implement a proper store. It's crude, due to a lack of knowledge.
import React, { useState, memo } from 'react';
import { equals, merge } from '@laufire/utils/collection';

/* State */
const Store = {
	initialState: {},
};

/* Helpers */
const hook = (mounted) => {
	const Memoized = memo(mounted, equals);

	return (params) => <Memoized { ...params }/>;
};

const init = () =>
	(Store.publish = (data) => merge(Store.initialState, data));

/* Exports */
const setup = ({ context }) => { // eslint-disable-line max-lines-per-function
	init();

	context.publish = (data) => Store.publish(data);
	context.hook = hook;
	context.next();

	context.root = () => {
		const [state, setState] = useState(Store.initialState);
		const Root = context.mount({ ...context })(state);

		if(!Store.reinitialized) {
			Store.reinitialized = true;
			Store.publish = (data) => setState(merge(
				{}, state, data
			));
		}

		return <Root { ...{ state } }/>;
	};
};

export default { setup };
