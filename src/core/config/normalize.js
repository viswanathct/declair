import { pick, merge, map, values } from '@laufire/utils/collection';
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
const normalize = (context) => {
	const { structure, types } = context;

	context.structure = getNormalizer(types)(structure);
};

export default normalize;
