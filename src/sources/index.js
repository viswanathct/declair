import providerTypes from './types';
import { map } from '@laufire/utils/collection';

/* Exports */
const providerConfig = {
	types: providerTypes,
};

const init = ({ config, context }) =>
	map(config.sources, (source, name) =>
		context.types[source.type].setup({
			config: source,
			context: context.sources[name],
		}));

export default {
	config: providerConfig,
	init: init,
};
