// TODO: Implement a proper store. It's crude, due to a lack of knowledge.
import React, { useState, memo } from 'react';
import { equals, merge } from '@laufire/utils/collection';

/* State */
const Store = {
	initialState: {},
};

/* Helpers */
const mount = (mounted) => {
	const Memoized = memo(mounted, equals);

	return (params) => <Memoized { ...params }/>;
};

const init = () =>
	(Store.publish = (data) => merge(Store.initialState, data));

const reinit = (state, setState) => {
	if(!Store.reinitialized) {
		Store.reinitialized = true;
		Store.publish = (data) => setState(merge(
			{}, state, data
		));
	}
};

/* Exports */
const setup = (props) => { // eslint-disable-line max-lines-per-function
	init();

	const publish = (data) => Store.publish(data);
	const context = props.next({ ...props, mount, publish });

	return {
		...context,
		structure: () => {
			const [state, setState] = useState(Store.initialState);
			const { structure } = context;
			const Root = structure();

			reinit(state, setState);

			return <Root { ...{ state } }/>;
		},
	};
};

export default { setup };
