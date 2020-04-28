import { map } from '@laufire/utils/collection';
import { resolver } from '../../context/resolve';

const mountItems = (parsedItems, mount) => () => map(parsedItems, mount);
const inheritedResolvers = ({ inherited, items }) =>
	map(items, (dummy, prop) => (data) => inherited(data)[prop]);
const observableResolvers = ({ context, data, items }) =>
	map(items, (dummy, prop) => () => context.state[data][prop]);

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
	parse: ({ context, parse, parsing, props, inherited }) => {
		const { data, items } = parsing;

		const resolverTree = inherited.data
			? inheritedResolvers({ inherited: inherited.data, items: items })
			: typeof data !== 'string'
				? map(data, (value) =>
					resolver({ context: context, prop: value }))
				: observableResolvers({ context, data, items });

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
