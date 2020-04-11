// TODO: Implement a proper store. It's crude, due to a lack of knowledge.
import React, { useState, memo } from 'react';
import { equals, merge } from '@laufire/utils/collection';

/* State */
const Store = {
	initialState: {},
};

/* Exports */
const setup = (props) => { // eslint-disable-line max-lines-per-function
	const mount = (mounted) => {
		const Memoized = memo(mounted, equals);

		return (params) => <Memoized { ...params }/>
		;
	};

	Store.publish = (data) => {
		merge(Store.initialState, data);
	};
	const publish = (data) => Store.publish(data);
	const context = props.next({ ...props, mount, publish });

	return {
		...context,
		Root: (configProps) => {
			const [state, setState] = useState(Store.initialState);

			if(!Store.initialized) {
				Store.initialized = true;
				Store.publish = (data) => setState(merge(
					{}, state, data
				));
				Store.Root = context.Root(configProps);

				return <Store.Root { ...{ state: Store.initialState } }/>;
			}

			return <Store.Root { ...{ state } }/>;
		},
	};
};

export default setup;
