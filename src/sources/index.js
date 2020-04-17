import providerTypes from './types';
import { map, merge, spread } from '@laufire/utils/collection';

/* Exports */
const config = {
	types: providerTypes,
};

const setup = ({ context }) => {
	const { publish, sources, types } = context;
	const parsed = map(sources, (source, name) => {
		const type = types[source.type];

		return type.parse({
			publish: publish,
			source: { name, ...merge(
				{}, type.config, source
			) },
		});
	});

	spread(context.sources, { parsed });

	context.next();
};

const init = ({ context }) => {
	const { sources, types } = context;

	map(sources, (source) => types[source.type].setup({ context: source }));
};

export default {
	config,	init,	setup,
};
