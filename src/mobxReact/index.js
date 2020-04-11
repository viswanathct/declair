// TODO: Implement mobx observer batching. It's not implemented, due to some platform specific implementation
import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { merge } from '@laufire/utils/collection';

/* State */
const Store = {
	initialState: {},
};

/* Exports */
const setup = (props) => { // eslint-disable-line max-lines-per-function
	Store.publish = (data) => merge(Store.initialState, data);

	const state = observable({});
	const publish = (data) => Store.publish(data);
	const mount = (mounted, mountConfig) => {
		if(!mountConfig.source)
			return mounted;

		const Memoized = observer(mounted);

		return (params) => <Memoized { ...params }/>;
	};
	const context = props.next({ ...props, mount, publish });

	return {
		...context,
		Root: (configProps) => {
			Store.publish = (data) => merge(state, data);
			Store.Root = context.Root(configProps);

			merge(state, Store.initialState);
			return <Store.Root { ...{ state } }/>;
		},
	};
};

export default setup;
