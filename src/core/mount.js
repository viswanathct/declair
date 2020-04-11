import { normalizeProps } from './utils';
import { map } from '@laufire/utils/collection';

/* Helpers */
const parseChildren = (config, mountWorker) => {
	const children = map(config.items, (itemConfig, key) =>
		(state) => mountWorker({ ...itemConfig, key })({
			data: itemConfig.source
				? state[itemConfig.source]
				: itemConfig.hasOwnProperty('data')
					? itemConfig.data
					: config.data[key] || {},
			state: state,
		}));

	return { children };
};

/* Exports */
const mount = (types, mountHook) => {
	const mountWorker = (props) => {
		const normalizedProps = normalizeProps(types, props);
		const type = types[normalizedProps.type];

		return mountHook(type.handler({
			...normalizedProps.type !== 'element'
				? {}
				: parseChildren(normalizedProps, mountWorker),
			...normalizedProps,
		}));
	};

	return mountWorker;
};

export default mount;
