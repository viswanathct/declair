import providerTypes from './types';
import { map } from '@laufire/utils/collection';

/* Helpers */
const getResolver = (
	context, name, cb
) =>
	(data) => (data !== undefined
		? context.publish({ [name]: cb(data) })
		: context.state[name]);

/* Exports */
const providerConfig = {
	types: providerTypes,
};

const init = ({ config, context }) => {
	context.sources = map(config.sources, (source, name) =>
		getResolver(
			context, name, context.types[source.type].setup()
		));

	map(config.sources, (source, name) => {
		source.data !== undefined && !context.sources[source.data]
			&& context.sources[name](source.data);
	});
};

export default {
	config: providerConfig,
	init: init,
};
