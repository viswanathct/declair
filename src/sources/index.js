import providerTypes from './types';
import { map, merge } from '@laufire/utils/collection';

/* Exports */
const config = {
	types: providerTypes,
};

const setup = ({ context }) => {
	const { publish, sources, types } = context;

	context.sources = map(sources, (source, name) => {
		const type = types[source.type];

		return type.setup({
			publish: publish,
			source: { name, ...merge(
				{}, type.config, source
			) },
		});
	});

	context.next();
};

export default {
	config,
	setup,
};
