import providerTypes from './types';
import { map, pick } from '@laufire/utils/collection';

/* Helpers */
const getResolver = (
	context, name, cb
) =>
	(dataIn) => (dataIn !== undefined
		? context.updateState({ [name]: cb(dataIn) })
		: context.state[name]);

/* Exports */
const providerConfig = {
	types: providerTypes,
};

const init = ({ config, context }) => {
	context.publish = (updates) => map(updates, (data, name) =>
		data !== undefined && !context.isObservable(data)
			&& context.sources[name](data));

	context.sources = map(config.sources, (source, name) =>
		getResolver(
			context, name, context.types[source.type]
				.setup(context.sources[name].props)
		));

	context.publish(pick(config.sources, 'data'));
};

export default {
	config: providerConfig,
	init: init,
};
