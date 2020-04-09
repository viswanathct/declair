// TODO: Implement a proper store. It's crude, due to a lack of knowledge.
import { useState } from 'react';
import { patch } from '@laufire/utils/collection';

/* State */
const Store = {};

/* Exports */
const setup = (props) => {
	const [state, setState] = useState({});

	return Store.renderRoot
		? (renderProps) => Store.renderRoot({ ...renderProps, state })
		: (Store.renderRoot = props.next({ ...props,
			publish: (data) => setState(patch(state, data)) }))
			&& (() => null);
};

export default setup;
