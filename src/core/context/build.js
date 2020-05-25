import { assign, merge } from '@laufire/utils/collection';
import mount from './mount';

const buildContext = (config) => {
	const context = {};

	return assign(context, {
		isObservable: (value) =>
			typeof value === 'string' && Boolean(config.sources[value]),
		mount: mount,
		publish: (data) => merge(context.state, data),
		Root: () => context.structure,
		state: {},
		sources: {},
	});
};

export default buildContext;
