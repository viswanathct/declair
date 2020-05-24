import { assign, map, clean } from '@laufire/utils/collection';
import { namedWrapper } from '../../utils';

const getTargetHooks = ({ context, parsing, parsedItems }) =>
	map(parsing.items, (item, key) => {
		const itemProps = parsedItems[key].props;
		const { data: itemData } = itemProps;
		const type = context.types[item.type];

		return !itemProps.target && type.interactive
			? (parentTarget) => () => parentTarget(itemData())
			: undefined;
	});

const getPropGetter = (data, key) => (data
	? () => data()[key]
	: undefined);
const getPropSetter = (data, key) => (data
	?	(dataIn) =>
		assign(data(), { [key]: dataIn })
	: undefined);

const parseItems = (parserArgs) => {
	const { context, prop, parse } = parserArgs;
	const parsedItems = map(prop, (item) => parse({ parsing: item }));
	const targetHooks = getTargetHooks({ ...parserArgs, parsedItems });

	return map(parsedItems, (item, key) => {
		const component = context.mount(item);

		return namedWrapper((itemRenderProps) => {
			const { data: itemData, target: itemTarget } = itemRenderProps;
			const parsedProps = parsedItems[key].props;
			const data = parsedProps.data || getPropGetter(itemData, key);
			const target = targetHooks[key]
				? targetHooks[key](itemTarget)
				: parsedProps.target || getPropSetter(itemData, key);

			return component({
				...itemRenderProps,
				...clean({ data, target }),
			});
		}, item);
	});
};

export default parseItems;
