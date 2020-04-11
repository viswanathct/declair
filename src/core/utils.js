import { pick, merge, map, values } from '@laufire/utils/collection';
import coreTypes from './config/types';
import defaults from './defaults';

const configKey = 'config';

/* Exports */
const normalizeConfig = (configuredTypes, rootExtensions) => {
	const normalizer = (extensions) => {
		const type = extensions.type || defaults.type;
		const typeCascade = pick({ coreTypes, configuredTypes }, type);
		const config = merge(
			{}, ...values(pick(typeCascade, configKey)), extensions
		);

		map(typeCascade, (cursor) =>
			(cursor.normalize || (() => {}))(config, normalizer));

		return config;
	};

	return normalizer(rootExtensions);
};

export {
	normalizeConfig,
};
