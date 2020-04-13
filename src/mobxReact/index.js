// TODO: Implement mobx observer batching. It's not implemented, due to some platform specific implementation
import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { merge } from '@laufire/utils/collection';

/* Workers */
const hook = (mounted, mountConfig) => {
	if(!mountConfig.source)
		return mounted;

	const Memoized = observer(mounted);

	return (params) => <Memoized { ...params }/>;
};

/* Exports */
const setup = ({ context }) => {
	const state = observable({});

	context.hook = hook;
	context.publish = (data) => merge(state, data);

	context.next();

	context.root = context.mount(context)(state);
};

export default { setup };
