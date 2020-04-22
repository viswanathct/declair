import { fill, map, merge, pick, values } from '@laufire/utils/collection';
import coreTypes from '../config/types';
import typeDefaults from '../config/defaults/type';

/* Exports */
const normalizeTypes = ({ config, context }) => {
	const providerTypes = merge(
		{}, coreTypes,
		merge({}, ...values(config.providers)).config.types
	);

	map(providerTypes, (type) => fill(type, typeDefaults));

	map(pick(providerTypes, 'props'), (type, typeName) =>
		merge(pick(type, 'default'), config.types[typeName]));

	context.types = providerTypes;
};

export default normalizeTypes;