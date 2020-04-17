import { fill, map, merge, pick, values } from '@laufire/utils/collection';
import coreTypes from '../config/types';
import typeDefaults from '../config/defaults/type';

/* Exports */
const normalizeTypes = ({ context }) => {
	const providerTypes = merge(
		{}, coreTypes,
		merge({}, ...values(context.providers)).config.types
	);

	map(providerTypes, (type) => fill(type, typeDefaults));

	map(pick(providerTypes, 'props'), (type, typeName) =>
		merge(pick(type, 'default'), context.types[typeName]));

	context.types = providerTypes;
};

export default normalizeTypes;
