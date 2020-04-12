import providerTypes from './types';
import { map, merge } from '@laufire/utils/collection';

/* Exports */
const config = {
	types: providerTypes,
};

const setup = (context) => {
	const { publish, sources: sourceConfig,
		types } = context;

	const sources = map(sourceConfig, (source, name) => {
		const type = types[source.type];

		return type.setup({
			publish: publish,
			source: { name, ...merge(
				{}, type.config, source
			) },
		});
	});

	const ret = context.next({ ...context, sources });

	return { ...ret, sources };
};

export default {
	config,
	setup,
};
