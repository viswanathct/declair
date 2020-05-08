/**
 * A source to support modifiable collections.
 *
 */

import { clone, map, merge } from '@laufire/utils/collection';

const actions = {
	create: ({ cb, data, state }) => {
		const id = data.id === undefined
			? state.index++
			: data.id;

		state.ids.push(id);
		state.data.push(clone(data));
		cb();
	},
	delete: ({ cb, data, state }) => {
		const found = state.ids.findIndex((id) => id === data.id);

		if(found === -1)
			return;

		state.ids.splice(found, 1);
		state.data.splice(found, 1);
		cb();
	},
	init: ({ data, state }) => {
		merge(state, {
			index: 0,
			data: clone(data),
			// #TODO: Use hash maps for performance.
			ids: map(data, (item) => item.id || state.index++),
		});
	},
	update: ({ cb, data, state }) => {
		const found = state.ids.findIndex((id) => id === data.id);

		if(found === -1)
			return;

		state.data.splice(
			found, 1, merge(
				{}, state.data[found], data
			)
		);
		cb();
	},
};

const collection = {
	props: {
		actions: {
			default: ['create', 'update', 'delete'],
		},
		data: {
			parse: (args) => {
				const { context, name } = args;
				const state = {};
				const cb = () => context.updateState({
					[name]: { data: state.data },
				});

				return (message) => (message
					? actions[message.action]({
						cb: cb,
						data: message.data,
						state: state,
					})
					: { data: state.data });
			},
		},
	},
	setup: ({ data }) => data,
	type: 'collection',
};

export default collection;
