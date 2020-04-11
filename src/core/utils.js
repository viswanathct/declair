import { merge } from '@laufire/utils/collection';
import defaults from './defaults';

/* Exports */
const normalizeProps = (types, props) => {
	const type = props.type || defaults.type;

	return merge(
		{}, { type }, defaults.typeConfigs[type],
		types[type]?.config, props
	);
};

export {
	normalizeProps,
};
