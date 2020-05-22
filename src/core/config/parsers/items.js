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

const parseItems = (parserArgs) => {
	const { context, prop, parse } = parserArgs;
	const parsedItems = map(prop, (item) => parse({ parsing: item }));
	const dataHooks = getDataHooks({ ...parserArgs, parsedItems });
	const itemTemplates = map(parsedItems, context.mount);

	return map(itemTemplates, (item, key) => {
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
};

export default parseItems;
