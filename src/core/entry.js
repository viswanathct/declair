import { values, map, sanitize } from '@laufire/utils/collection';
import normalizeTypes from './context/normalizeTypes';
import normalizeConfig from './context/normalizeConfig';
import parseConfig from './context/parseConfig';
import doNothing from './utils';

/* Tasks */
const setupProvider = (provider, config) => provider.setup(config);

const setupProviders = ({ context }) => {
	const providers = values(context.providers);
	const mount = doNothing;

	const next = (() => {
		let index = 0;

		return (providerContext) =>
			(index < providers.length
				? setupProvider(providers[index++],
					{ mount, ...providerContext, next })
				: doNothing);
	})();

	return next(context);
};

/* Exports */
const entry = (config) => {
	const context = sanitize(config);

	return map([normalizeTypes, normalizeConfig, parseConfig, setupProviders],
		(f) => f({ config, context })).pop();
};

export default entry;
