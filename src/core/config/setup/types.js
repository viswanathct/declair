import { map, merge, pick, fill } from '@laufire/utils/collection';
import coreTypes from '../types';
import typeDefaults from '../defaults/type';

/* Exports */
const setup = ({ context }) => {
	const providerTypes = merge(
		{}, coreTypes,
		merge({}, ...context.providers).config.types
	);

	map(providerTypes, (type) => fill(type, typeDefaults));

	map(pick(providerTypes, 'props'), (type, typeName) =>
		merge(pick(type, 'default'), context.types[typeName]));

	context.types = providerTypes;
};

export default setup;
