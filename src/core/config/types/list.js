import { map, merge } from '@laufire/utils/collection';

const decorate = ({ item, itemData, props }) => {
	const data = (dataIn) =>
		(dataIn !== undefined
			? props.data(merge(dataIn, { data: itemData }))
			: itemData);

	return { ...item, props: { ...item.props, data }};
};

export default {
	parse: (args) => {
		const { context, props } = args;
		const { data, item } = props;
		const getData = props.actions
			? () => data().data
			: data;

		props.items = () =>
			map(getData(), (itemData) =>
				context.mount(decorate({ context, item, itemData, props })));
	},
};
