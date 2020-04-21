import providerTypes from './types';
import { map } from '@laufire/utils/collection';

/* Exports */
const providerConfig = {
	types: providerTypes,
};

const init = ({ config, context }) => {
	context.sources = map(config.sources, (source, name) => {
		const handler = context.types[source.type]
			.setup(context.sources[name].props);

		source.data && !context.sources[source.data] && handler(source.data);

		return handler;
	});
};

export default {
	config: providerConfig,
	init: init,
};
