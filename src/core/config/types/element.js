import { map, merge, pick, select, spread } from '@laufire/utils/collection';

const mountItems = (parsedItems, mount) => () => map(parsedItems, mount);

export default {
	props: {
		data: {
			default: {},
			normalize: ({ prop, config }) => {
				const { items } = config;
				const data = merge(prop, pick(items, 'data'));

				spread(items, { data: select(data, items) });

				return data;
			},
			primitive: false,
		},
		items: {
			default: {},
			normalize: ({ prop, normalize }) => map(prop, normalize),
			parse: ({ context, prop, parse }) => {
				const parsedItems = map(prop, (item) =>
					parse({ config: item }));

				return mountItems(parsedItems, context.mount);
			},
		},
		type: {
			default: 'element',
		},
	},
};
