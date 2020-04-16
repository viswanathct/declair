import { values, map, sanitize } from '@laufire/utils/collection';
import normalizeTypes from './context/normalizeTypes';
import normalizeConfig from './context/normalizeConfig';
import parseConfig from './context/parseConfig';
import mount from './context/mount';
import { doNothing } from './utils';

/* Tasks */
const setupProvider = (
	provider, context, config
) =>
	(provider.setup || doNothing)({ context, config });

const fillerPublish = doNothing;

const setupProviders = ({ context, config }) => {
	const providers = values(context.providers);

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

/* Exports */
const entry = (config) => {
	const context = {
		...sanitize(config),
		mount: mount,
		publish: fillerPublish,
	};
	const executeAction = (f) => f({ config, context });

	map({
		normalizeTypes, normalizeConfig,
		setupProviders, parseConfig,
	}, executeAction);

	const { publish, sources, root } = context;

	return {
		publish,
		sources,
		root,
	};
};

export default entry;
