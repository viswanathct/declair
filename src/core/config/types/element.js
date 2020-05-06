import { map } from '@laufire/utils/collection';

const itemToMount = (
	data, key, item, mount
) => mount(item)({ data: () => data()[key] });

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

		props.items = (data) =>
			map(parsedItems, (item, key) => itemToMount(
				data, key, item, context.mount
			));
	},
};
