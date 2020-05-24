import { merge, assign } from '@laufire/utils/collection';

const getData = ({ props }) => {
	const { data } = props;

	return props.actions
		? () => data()?.data
		: () => data();
};

const getTarget = ({ props }) => {
	const { target } = props;

	return props.actions
		? (dataIn, itemData) => target(merge(
			{}, { data: itemData }, dataIn
		))
		: (dataIn, itemData) => target(merge(
			{}, itemData, dataIn
		));
};

/* Exports */
const list = {
	parse: ({ props }) => {
		assign(props, {
			data: getData({ props }),
			target: getTarget({ props }),
		});
	},
};

export default list;
