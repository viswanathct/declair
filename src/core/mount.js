import { normalizeProps } from './utils';
import { collect } from '@laufire/utils/collection';

/* Helpers */
const parseChildren = (config, mountWorker) => {
	const children = collect(config.items, (itemConfig, key) =>
		({ config: itemConfig, render: mountWorker({ ...itemConfig, key }) }));
	const renderChild = (key, state) => {
		const child = children[key];

		return child.render({
			state,
			...{
				data: child.config.source
					? state[child.config.source]
					: child.config.hasOwnProperty('data')
						? child.config.data
						: config.data[key] || {},
			},
		});
	};

	return { children, renderChild };
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
