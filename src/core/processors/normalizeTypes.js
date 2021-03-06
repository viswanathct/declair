import { fill, map, merge, pick, values } from '@laufire/utils/collection';
import components from '../components/types';
import { type as typeDefaults } from '../defaults';

/* Exports */
const normalizeTypes = ({ config, context }) => {
	const providerTypes = merge(
		{}, components,
		merge({}, ...values(config.providers)).config.types
	);

	map(providerTypes, (type, name) =>
		merge(fill(type, typeDefaults), { type: name }));

	map(pick(providerTypes, 'props'), (type, typeName) =>
		merge(pick(type, 'default'), config.types[typeName]));

	context.types = providerTypes;
};

export default normalizeTypes;
