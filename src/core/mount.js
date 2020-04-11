import { filter, map, merge } from '@laufire/utils/collection';
import { normalizeConfig } from './utils';

/* Helpers */
const parseChildren = (config, mountWorker) => {
	const children = map(config.items, (itemConfig) =>
		({ state }) => mountWorker({
			...itemConfig,
			getData: itemConfig.source
				? () => state[itemConfig.source]
				: () => itemConfig.data,
		})({ state }));

	return { children };
};

/* Exports */
const mount = (SetupProps, handlerTypes) => {
	const { mount: mountHook, types: typeCustomizations } = SetupProps;
	const types = filter(merge(
		{}, typeCustomizations, handlerTypes
	), (type) => type.type === 'widget');

	const mountWorker = (config) => {
		const mountConfig = {
			...config,
			...config.type !== 'element'
				? {}
				: parseChildren(config, mountWorker),
		};

		return mountHook(types[config.type].handler(mountConfig), mountConfig);
	};
	const root = (config) => mountWorker(normalizeConfig(types, config));

	return root;
};

export default mount;
