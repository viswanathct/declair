/**
 * A source to support modifiable collections.
 *
 */

import { merge, map } from '@laufire/utils/collection';

const actions = {
	create: ({ cb, data, state }) => {
		const id = data.id === undefined
			? state.index++
			: data.id;

		state.ids.push(id);
		state.data.push(data);
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
				const resolvedData = args.resolver(args)();
				const state = {
					index: 0,
					data: resolvedData,
				};
				const cb = () => context.updateState({
					[name]: { data: state.data },
				});

				// #TODO: Use hash maps for performance.
				state.ids = map(resolvedData,
					(item) => item.id || state.index++);

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
