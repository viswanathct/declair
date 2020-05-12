import { map } from '@laufire/utils/collection';
import { interceptArgs } from '../../utils';

const parseItems = ({ context, items, parsed }) =>
	map(items, (item, key) => {
		const parsedProps = parsed[key].props;
		const type = context.types[item.type];

		return type.interactive && !parsedProps.target()
			? type.editable
				? (parentData) => (dataIn) => (dataIn !== undefined
					? parentData(parsedProps.data())
					: parsedProps.data())
				: (parentData) => () => parentData(parsedProps.data())
			: undefined;
	});

export default {
	props: {
		items: {
			default: {},
			normalize: ({ prop, normalize }) => map(prop, normalize),
		},
	},
	parse: (args) => {
		const { context, parse, parsing, props } = args;
		const { items } = parsing;
		const parsed = map(items, (item) => parse({ parsing: item }));
		const dataHooks = parseItems({ context, items, parsed });
		const intercepted = interceptArgs(args.type, 'setup');

		props.items = () => map(parsed, (item, key) =>
			context.mount({
				...item, props: {
					...item.props,
					data: dataHooks[key]
						? dataHooks[key](intercepted.setup.data)
						: item.props.data
							|| (() => intercepted.setup.data()[key]),
				},
			}));
	},
};
