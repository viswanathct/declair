import { map, merge, pick, select, spread } from '@laufire/utils/collection';

const itemMounter = (parsed, mount) => () => map(parsed, mount);

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
			primitive: false,
		},
		items: {
			default: {},
			normalize: ({ prop, normalize }) => map(prop, normalize),
			parse: ({ context, prop, parse }) => {
				const parsed = map(prop, (item) => parse({ config: item }));

				return itemMounter(parsed, context.mount);
			},
		},
		type: {
			default: 'element',
		},
	},
};
