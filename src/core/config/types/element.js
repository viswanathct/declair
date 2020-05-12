import { map } from '@laufire/utils/collection';
import { getRenderProps } from '../../utils';

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
	parse: (parserArgs) => {
		const { context, parse, parsing, props } = parserArgs;
		const { items } = parsing;
		const parsed = map(items, (item) => parse({ parsing: item }));
		const dataHooks = parseItems({ context, items, parsed });
		const renderProps = getRenderProps(parserArgs);

		props.items = () => map(parsed, (item, key) =>
			context.mount({
				...item, props: {
					...item.props,
					data: dataHooks[key]
						? dataHooks[key](renderProps.data)
						: item.props.data
							|| (() => renderProps.data()[key]),
				},
			}));

		return parserArgs;
	},
};
