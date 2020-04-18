// TODO: Nodes are re-rendered for every property access. Batch this.
import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { merge } from '@laufire/utils/collection';
import { hook } from '../core/utils';

import 'mobx-react/batchingForReactNative';

/* Workers */
const mountHook = (mounted, parsed) => {
	if(!parsed.hasSource)
		return mounted;

	const Memoized = observer(mounted);

	return (params) => <Memoized { ...params }/>;
};

/* Exports */
const setup = ({ context }) => {
	context.state = observable({});
	context.mount = hook(context.mount, mountHook);
	context.publish = (data) => merge(context.state, data);

	context.next();
	context.root = () => context.mount(context.structure)();
};

export default { setup };
