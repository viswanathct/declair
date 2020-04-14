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
			parse: ({ context, prop, parse }) => () =>
				map(prop, (item) => context.mount(parse({ config: item }))),
		},
		type: {
			default: 'element',
		},
	},
};
