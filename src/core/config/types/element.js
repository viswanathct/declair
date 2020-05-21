import { map, assign } from '@laufire/utils/collection';
import { setupHook } from '../../utils';

const getDataHooks = ({ context, items, parsed }) =>
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

const getItemRenderers = ({ context, dataHooks,
	parentProps, parsed }) => {
	const itemTemplates = map(parsed, context.mount);

	return map(itemTemplates, (item, key) => {
		const Item = (renderProps) => item({
			...renderProps,
			data: dataHooks[key]
				? dataHooks[key](parentProps.data)
				: parsed[key].props.data
					|| (() => parentProps.data()[key]),
		});

		return Item;
	});
};

/* Exports */
const element = {
	parse: (parserArgs) => {
		const { context, parse, parsing, type } = parserArgs;
		const { items } = parsing;
		const parsed = map(items, (item) => parse({ parsing: item }));
		const dataHooks = getDataHooks({ context, items, parsed });

		setupHook(parserArgs, () => {
			const { render } = type;
			const parentProps = {};
			const itemRenderers = getItemRenderers({ context, dataHooks,
				parentProps, parsed });

			return (renderProps) => {
				assign(parentProps, renderProps);

				return render({
					...renderProps,
					items: () => itemRenderers,
				});
			};
		});

		return parserArgs;
	},
};

export default element;
