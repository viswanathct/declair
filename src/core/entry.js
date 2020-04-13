import { values, map, sanitize } from '@laufire/utils/collection';
import setupTypes from './config/setup/types';
import normalize from './config/normalize';
import parse from './config/parse';
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

	return map([setupTypes, normalize, parse, setupProviders],
		(f) => f({ config, context })).pop();
};

export default entry;
