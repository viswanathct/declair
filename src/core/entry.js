import { filter, map,
	sanitize, values } from '@laufire/utils/collection';
import normalizeTypes from './processors/normalizeTypes';
import processDependencies from './processors/processDependencies';
import normalizeConfig from './processors/normalizeConfig';
import parseConfig from './processors/parseConfig';
import buildContext from './context/build';

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

	const { publish, sources, Root } = context;

	return { publish, sources, Root };
};

export default entry;
