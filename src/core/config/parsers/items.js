import { assign, map } from '@laufire/utils/collection';
import { namedWrapper } from '../../utils';

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

const getPropsAccessor = (data, key) => (dataIn) =>
	(dataIn !== undefined
		? assign(data(), { [key]: dataIn })
		: data()[key]);

const parseItems = (parserArgs) => {
	const { context, prop, parse } = parserArgs;
	const parsedItems = map(prop, (item) => parse({ parsing: item }));
	const dataHooks = getDataHooks({ ...parserArgs, parsedItems });

	return map(parsedItems, (item, key) => {
		const component = context.mount(item);

		return namedWrapper((itemRenderProps) => {
			const { data } = itemRenderProps;

			return component({
				...itemRenderProps,
				data: dataHooks[key]
					? dataHooks[key](data)
					: parsedItems[key].props.data
						|| getPropsAccessor(data, key),
			});
		}, item);
	});
};

export default parseItems;
