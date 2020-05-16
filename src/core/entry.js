import {
	assign, filter, map, merge,
	sanitize, values,
} from '@laufire/utils/collection';
import normalizeTypes from './context/normalizeTypes';
import processDependencies from './context/processDependencies';
import normalizeConfig from './context/normalizeConfig';
import parseConfig from './context/parseConfig';
import mount from './context/mount';

/* Helpers */
const buildContext = (config) => {
	const context = {};

	return assign(context, {
		isObservable: (value) =>
			typeof value === 'string' && Boolean(config.sources[value]),
		mount: mount,
		publish: (data) => merge(context.state, data),
		root: () => context.structure,
		state: {},
		sources: {},
	});
};

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

const buildStructure = ({ context }) =>
	(context.structure = context.mount(context.structure));

/* Exports */
const entry = (inConfig) => {
	const config = sanitize(inConfig);
	const context = buildContext(config);
	const executeAction = (f) => f({ config, context });

	map({
		normalizeTypes, processDependencies, normalizeConfig,
		setupProviders, parseConfig, initProviders, buildStructure,
	}, executeAction);

	// #LATER: setup to init could be done serially on items, to avoid the need for run-time need for finding evaluators.

	const { publish, sources, root } = context;

	return { publish, sources, root };
};

export default entry;
