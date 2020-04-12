import { map } from '@laufire/utils/collection';

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
const mount = ({ mount: mountHook, structure, types }) => {
	const mountWorker = (config) => {
		const mountConfig = {
			...config,
			...config.type !== 'element'
				? {}
				: parseChildren(config, mountWorker),
		};

		return mountHook(types[config.type].handler(mountConfig),
			mountConfig);
	};

	return (state) => mountWorker({ ...structure, state });
};

export default mount;
