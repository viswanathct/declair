// TODO: Fix: Re-rendering of a component causes it children (esp: Inputs) to lose internal state. This isn't fixed even when all components are memoized.
import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { merge } from '@laufire/utils/collection';
import { hook } from '../core/utils';

import 'mobx-react/batchingForReactNative';

/* Workers */
const mountHook = (mounted) => {
	const Memoized = observer(mounted);

	return (params) => <Memoized { ...params }/>;
};

/* Exports */
const setup = ({ context }) => {
	context.state = observable({});
	context.mount = hook(context.mount, mountHook);
	context.updateState = (data) => merge(context.state, data);

	context.next();
};

export default { setup };
