import { pick, merge, map, values } from '@laufire/utils/collection';
import coreTypes from './config/types';
import defaults from './defaults';

const configKey = 'config';

/* Exports */
const normalizeConfig = (configuredTypes, userExtensions) => {
	const type = userExtensions.type || defaults.type;
	const typeCascade = pick({ coreTypes, configuredTypes }, type);
	const config = merge(
		{}, ...values(pick(typeCascade, configKey)), userExtensions
	);

	map(typeCascade, (cursor) => (cursor.normalize || (() => {}))(config));

	return config;
};

export {
	normalizeConfig,
};
