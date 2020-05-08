import {
	filter, map, merge,
	sanitize, values,
} from '@laufire/utils/collection';
import normalizeTypes from './context/normalizeTypes';
import normalizeConfig from './context/normalizeConfig';
import parseConfig from './context/parseConfig';
import mount from './context/mount';

/* Tasks */
const setupProviders = ({ config, context }) => {
	const providers = values(filter(config.providers,
		(provider) => provider.setup));

	context.next = (() => {
		let index = 0;

		return () =>
			index < providers.length
				&& providers[index++].setup({ context, config });
	})();

	context.next();
};

const initProviders = ({ config, context }) => {
	const providers = values(filter(config.providers,
		(provider) => provider.init));

	map(providers, (provider) => provider.init({ config, context }));
};

/* Exports */
const entry = (inConfig) => {
	const config = sanitize(inConfig);
	const context = {
		isObservable: (value) =>
			typeof value === 'string' && Boolean(config.sources[value]),
		mount: mount,
		publish: (data) => merge(context.state, data),
		root: () => context.mount(context.structure)(),
		state: {},
		sources: {},
	};
	const executeAction = (f) => f({ config, context });

	map({
		normalizeTypes, normalizeConfig,
		setupProviders, parseConfig, initProviders,
	}, executeAction);

	const { publish, sources, root } = context;

	return { publish, sources, root };
};

export default entry;
