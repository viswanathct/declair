import { map } from '@laufire/utils/collection';

const mountItems = (parsedItems, mount) => () => map(parsedItems, mount);

const inheritedResolvers = ({ inherited, items }) =>
	map(items, (dummy, itemName) => (data) => inherited(data)[itemName]);

export default {
	props: {
		data: {
			default: {},
		},
		items: {
			default: {},
			normalize: ({ prop, normalize }) => map(prop, normalize),
		},
	},
	parse: (args) => {
		const { context, parse, parsing, props, inherited, resolver } = args;
		const { items } = parsing;

		const resolverTree = inherited.data
			? inheritedResolvers({ inherited: inherited.data, items: items })
			: resolver(args);

		const parsedItems = map(items, (item, childKey) =>
			parse({
				parsing: item,
				inherited: {
					data: resolverTree[childKey],
				},
			}));

		props.items = mountItems(parsedItems, context.mount);
	},
};
