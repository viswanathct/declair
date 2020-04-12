import { map, merge, pick, select, spread } from '@laufire/utils/collection';

export default {
	config: {
		data: {},
		items: {},
		type: 'element',
	},
	processors: {
		data: ({ prop, config }) => {
			const { items } = config;
			const data = merge(prop, pick(items, 'data'));

			spread(items, { data: select(data, items) });

			return data;
		},
		items: ({ prop, normalize }) => map(prop, normalize),
	},
};
