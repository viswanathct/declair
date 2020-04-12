import { values, map, sanitize } from '@laufire/utils/collection';
import setupTypes from './config/setup/types';
import normalize from './config/normalize';
import doNothing from './utils';

/* Tasks */
const setupProvider = (provider, config) => provider.setup(config);

const setupProviders = (context) => {
	const providers = values(context.providers);
	const mount = doNothing;

	const next = (() => {
		let index = 0;

		return (providerConfig) =>
			(index < providers.length
				? setupProvider(providers[index++],
					{ mount, ...providerConfig, next })
				: doNothing);
	})();

	return next(context);
};

/* Exports */
const entry = (config) => {
	const context = sanitize(config);

	return map([setupTypes, normalize, setupProviders],
		(f) => f(context)).pop();
};

export default entry;
