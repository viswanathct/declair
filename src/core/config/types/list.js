import { map, merge } from '@laufire/utils/collection';

const decorate = ({ item, itemData, props }) => {
	const data = (dataIn) =>
		(dataIn !== undefined
			? props.data(merge(
				{}, { data: itemData }, dataIn
			))
			: itemData);

	return { ...item, props: { ...item.props, data }};
};

/* Exports */
const list = {
	parse: (args) => {
		const { context, props } = args;
		const { data, item } = props;
		const getData = props.actions
			? () => data().data
			: data;

		props.items = () => map(getData(), (itemData) =>
			context.mount(decorate({ context, item, itemData, props })));
	},
};

export default list;
