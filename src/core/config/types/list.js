import { merge } from '@laufire/utils/collection';

const getDataCall = ({ props }) => {
	const { data } = props;

	return props.actions
		? (dataIn, itemData) => data(dataIn !== undefined
			? merge(
				{}, { data: itemData }, dataIn
			)
			: undefined)?.data || {}
		: (dataIn, itemData) => data(dataIn !== undefined
			? merge(
				{}, itemData, dataIn
			)
			: undefined) || {};
};

/* Exports */
const list = {
	parse: ({ props }) => {
		props.data = getDataCall({ props });
	},
};

export default list;
