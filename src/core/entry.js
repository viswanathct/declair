import { filter, map, sanitize, values } from '@laufire/utils/collection';
import normalizeTypes from './context/normalizeTypes';
import normalizeConfig from './context/normalizeConfig';
import parseConfig from './context/parseConfig';
import mount from './context/mount';
import { doNothing } from './utils';

/* Data */
const fillerPublish = doNothing;

/* Tasks */
const setupProvider = (
	provider, context, config
) =>
	provider.setup({ context, config });

const setupProviders = ({ config, context }) => {
	const providers = values(filter(config.providers,
		(provider) => provider.setup));

	context.next = (() => {
		let index = 0;

		return () =>
			(index < providers.length
				? setupProvider(
					providers[index++], context, config
				)
				: doNothing);
	})();

	context.next();
};

const initProviders = ({ config, context }) => {
	const providers = values(config.providers);

	map(providers, (provider) =>
		(provider.init || doNothing)({ config, context }));
};

/* Exports */
const entry = (inConfig) => {
	const config = sanitize(inConfig);
	const context = {
		mount: mount,
		publish: fillerPublish,
	};
	const executeAction = (f) => f({ config, context });

	map({
		normalizeTypes, normalizeConfig,
		setupProviders, parseConfig, initProviders,
	}, executeAction);

	const { publish, sources, root } = context;

	return {
		publish,
		sources,
		root,
	};
};

export default entry;
