import { map } from '@laufire/utils/collection';
import { namedWrapper, whenData } from '../../utils';

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

const propAccessor = (parentData, key) => (parentData
	?	(value) => (value !== undefined
		? parentData({ [key]: value })
		: parentData()[key])
	: undefined);

const parseItems = (parserArgs) => {
	const { context, prop, parse } = parserArgs;
	const items = map(prop, (item) => parse({ parsing: item }));
	const targetHooks = getTargetHooks({ items });

	return map(items, (item, key) => {
		const component = context.mount(item);

		return namedWrapper((itemRenderProps) => {
			const { data: parentData, target: parentTarget } = itemRenderProps;
			const parsedProps = items[key].props;

			return whenData(parentData, () => component({
				...itemRenderProps,
				data: parsedProps.data || propAccessor(parentData, key),
				target: parsedProps.target || (targetHooks[key]
					? targetHooks[key](parentTarget)
					: propAccessor(parentData, key)),
			}));
		}, item);
	});
};

export default parseItems;
