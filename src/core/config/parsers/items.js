import { assign, map } from '@laufire/utils/collection';

const getDataHooks = ({ context, parsing, parsedItems }) =>
	map(parsing.items, (item, key) => {
		const itemProps = parsedItems[key].props;
		const { data: itemData } = itemProps;
		const type = context.types[item.type];

		return type.interactive && !itemProps.target()
			? type.editable
				? (data) => (dataIn) => (dataIn !== undefined
					? data(itemData())
					: itemData())
				: (data) => () => data(itemData())
			: undefined;
	});

const getPropsAccessor = (state, key) => (dataIn) =>
	(dataIn !== undefined
		? assign(state, { [key]: dataIn })
		: state[key]);

const getItemRenderers = (parserArgs) => {
	const { context, props } = parserArgs;
	const parsedItems = props.items();
	const dataHooks = getDataHooks({ ...parserArgs, parsedItems });
	const itemTemplates = map(parsedItems, context.mount);

	const items = map(itemTemplates, (item, key) => {
		const Item = (itemRenderProps) => {
			const { data } = itemRenderProps;

			return item({
				...itemRenderProps,
				data: dataHooks[key]
					? dataHooks[key](data)
					: parsedItems[key].props.data
						|| getPropsAccessor(data(), key),
			});
		};

		return Item;
	});

	return () => items;
};

export default getItemRenderers;
