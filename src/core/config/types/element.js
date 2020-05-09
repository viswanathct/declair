import { map } from '@laufire/utils/collection';

const itemToMount = (renderProps, key) => ({
	...renderProps,
	data: () => renderProps.data()[key],
});

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

		props.items = (renderProps) =>
			map(parsedItems, (item, key) =>
				context.mount(item)(itemToMount(renderProps, key)));
	},
};
