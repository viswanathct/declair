import providerTypes from './types';
import { map } from '@laufire/utils/collection';

/* Exports */
const providerConfig = {
	types: providerTypes,
};

const init = ({ config, context }) => {
	context.sources = map(config.sources, (source, name) =>
		context.types[source.type].setup(context.sources[name].props));

	map(config.sources, (source, name) => {
		source.data !== undefined && !context.sources[source.data]
			&& context.sources[name](source.data);
	});
};

export default {
	config: providerConfig,
	init: init,
};
