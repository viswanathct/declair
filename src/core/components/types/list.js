import { merge, assign } from '@laufire/utils/collection';
import { isSourceSimple } from '../../utils';

const getTarget = (props, isSimple) => {
	const { target } = props;

	return isSimple
		? (dataIn, itemData) => target(merge(
			{}, itemData, dataIn
		))
		: (dataIn, itemData) => target(merge(
			{}, { data: itemData }, dataIn
		));
};

/* Exports */
const list = {
	parse: (parserArgs) => {
		const { props } = parserArgs;
		const isSimple = isSourceSimple(parserArgs);

		assign(props, {
			target: getTarget(props, isSimple),
		});
	},
};

export default list;
