import { clone, values, map } from '@laufire/utils/collection';
import setupTypes from './config/setup/types';
import normalize from './config/normalize';

/* Data */
const doNothing = (x) => x;

/* Tasks */
const setupProvider = (provider, config) => {
	(provider.normalize || doNothing)(config);
	return provider.setup(config);
};

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
	const context = clone(config);

	return map([setupTypes, normalize, setupProviders],
		(f) => f(context)).pop();
};

export default entry;
