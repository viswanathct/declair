import { filter, pick, merge, map, values } from '@laufire/utils/collection';
import coreTypes from './types';
import defaults from '../defaults';

/* Data */
const configKey = 'config';

/* Helpers */
const getNormalizer = (types) => {
	const normalizer = (extensions) => {
		const type = extensions.type || defaults.type;
		const typeCascade = pick({ coreTypes, types }, type);
		const childConfig = merge(
			{},
			...values(pick(typeCascade, configKey)),
			extensions,
		);

		map(typeCascade, (cursor) =>
			(cursor.normalize || (() => {}))(childConfig, normalizer));

		return childConfig;
	};

	return normalizer;
};

/* Exports */
const normalize = ({ context, types: handlerTypes }) => {
	const { types: typeCustomizations } = context;
	const types = filter(merge(
		{}, handlerTypes, typeCustomizations,
	), (type) => type.type === 'widget');

	return {
		structure: getNormalizer(types)(context.structure),
		types: types,
	};
};

export default normalize;
