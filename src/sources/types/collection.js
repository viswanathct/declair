/**
 * A source to support modifiable collections.
 *
 */

import { assign, clone, pick,
	map, merge, contains } from '@laufire/utils/collection';

const actions = {
	create: ({ data, state }) => {
		const id = data.id === undefined
			? state.index++
			: data.id;

		state.ids.push(id);
		state.data.push(assign(clone(data), { id }));
	},
	delete: ({ data, state }) => {
		const found = state.ids.findIndex((id) => id === data.id);

		if(found === -1)
			return;

		state.ids.splice(found, 1);
		state.data.splice(found, 1);
	},
	init: ({ data, state }) => {
		map(data, (item) =>
			(item.id !== undefined || (item.id = state.index++)));

		merge(state, {
			data: clone(data),
			// #TODO: Use hash maps for performance.
			ids: pick(data, 'id'),
		});
	},
	update: ({ data, state }) => {
		const found = state.ids.findIndex((id) => id === data.id);

		if(found === -1)
			return;

		const existing = state.data[found];

		!contains(existing, data) && state.data.splice(
			found, 1, merge(
				{}, existing, data
			)
		);
	},
};

const collection = {
	simple: false,
	props: {
		actions: {
			default: ['create', 'update', 'delete'],
		},
		data: {
			parse: (args) => {
				const { prop } = args;
				const state = {
					index: 0,
				};

				const data = (message) => (message
					? actions[message.action]({
						data: message.data,
						state: state,
					}) || { data: [...state.data] }
					: { data: state.data });

				data({ action: 'init', data: prop });

				return data;
			},
		},
	},
	setup: ({ data }) => data,
	type: 'collection',
};

export default collection;
