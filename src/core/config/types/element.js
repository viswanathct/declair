import { map } from '@laufire/utils/collection';

const mountItems = (parsedItems, mount) => () => map(parsedItems, mount);

export default {
	props: {
		data: {},
		items: {
			default: {},
			normalize: ({ prop, normalize }) => map(prop, normalize),
		},
	},
	parse: (args) => {
		const { context, parse, parsing, props } = args;
		const { items } = parsing;

		const parsedItems = map(items, (item) =>
			parse({ parsing: item }));

		props.items = mountItems(parsedItems, context.mount);
	},
};
