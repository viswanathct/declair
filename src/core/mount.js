import { normalizeConfig } from './utils';
import { map } from '@laufire/utils/collection';

/* Helpers */
const parseChildren = (config, mountWorker) => {
	const children = map(config.items, (itemConfig, key) =>
		(state) => mountWorker({ ...itemConfig, key })({
			data: itemConfig.source
				? state[itemConfig.source]
				: itemConfig.data,
			state: state,
		}));

	return { children };
};

/* Exports */
const mount = (types, mountHook) => {
	const mountWorker = (config) => {
		const normalizedConfig = normalizeConfig(types, config);
		const type = types[normalizedConfig.type];

		return mountHook(type.handler({
			...normalizedConfig.type !== 'element'
				? {}
				: parseChildren(normalizedConfig, mountWorker),
			...normalizedConfig,
		}));
	};

	return mountWorker;
};

export default mount;
