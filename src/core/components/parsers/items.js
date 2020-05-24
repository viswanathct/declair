import { assign, map, clean } from '@laufire/utils/collection';
import { namedWrapper } from '../../utils';

const getTargetHooks = ({ items }) =>
	map(items, (item) => {
		const { action, data } = item.props;

		return action
			? data
				? (parentTarget) => () =>
					parentTarget({ action: action(), data: data() })
				: (parentTarget) => () => parentTarget({ action: action() })
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
	const items = map(prop, (item) => parse({ parsing: item }));
	const targetHooks = getTargetHooks({ items });

	return map(items, (item, key) => {
		const component = context.mount(item);

		return namedWrapper((itemRenderProps) => {
			const { data: itemData, target: itemTarget } = itemRenderProps;
			const parsedProps = items[key].props;
			const data = parsedProps.data || getPropGetter(itemData, key);
			const target = parsedProps.target || (targetHooks[key]
				? targetHooks[key](itemTarget)
				: getPropSetter(itemData, key));

			return component({
				...itemRenderProps,
				...clean({ data, target }),
			});
		}, item);
	});
};

export default parseItems;
