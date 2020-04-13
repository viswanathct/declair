import { map, merge, pick, select, spread } from '@laufire/utils/collection';

export default {
	props: {
		data: {
			default: {},
			normalize: ({ prop, context }) => {
				const { items } = context;
				const data = merge(prop, pick(items, 'data'));

				spread(items, { data: select(data, items) });

				return data;
			},
		},
		items: {
			default: {},
			normalize: ({ prop, normalize }) => map(prop, normalize),
			parse: ({ prop, parse }) => map(prop, parse),
		},
		type: {
			default: 'element',
		},
	},
};
