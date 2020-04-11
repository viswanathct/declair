import { filter, map, merge } from '@laufire/utils/collection';
import { normalizeConfig } from './utils';

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
const mount = (SetupProps, handlerTypes) => {
	const { mount: mountHook, types: typeCustomizations } = SetupProps;
	const types = filter(merge(
		{}, typeCustomizations, handlerTypes
	), (type) => type.type === 'widget');

	const mountWorker = (config) =>
		mountHook(types[config.type].handler({
			...config,
			...config.type !== 'element'
				? {}
				: parseChildren(config, mountWorker),
		}));
	const root = (config) => mountWorker(normalizeConfig(types, config));

	return root;
};

export default mount;
