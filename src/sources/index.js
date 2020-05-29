import providerTypes from './types';
import { combine, compose, equals,
	filter, map, values } from '@laufire/utils/collection';

/* Helpers */
const delegateToSource = (
	context, cb, data, name
) => {
	const returned = cb(data);

	if(returned !== undefined)
		context.updateState({ [name]: returned });

	return returned;
};
const getResolver = (
	context, name, cb
) =>
	(dataIn) => (dataIn !== undefined
		? delegateToSource(
			context, cb, dataIn, name,
		)
		: context.state[name] !== undefined
			? context.state[name]
			: (context.state[name] = cb(dataIn)));

const buildResolvers = ({ config, context }) =>
	map(config.sources, (source, name) =>
		(context.sources[name] = getResolver(
			context, name, context.types[source.type]
				.setup(context.sources[name].props)
		)));

/* Exports */
const providerConfig = {
	types: providerTypes,
};

const init = ({ config, context }) => {
	const { updateState } = context;

	const resetState = (source) =>
		(context.state[source] = undefined);

	context.refreshState = (source) => {
		resetState(source);
		context.updateState({ [source]: context.sources[source]() });
	};

	context.updateState = (updates) => {
		const changes = filter(updates, (value, source) =>
			!equals(value, context.state[source]));
		const dependents = combine([],
			...values(compose(changes, context.dependencyMap)));

		map(dependents, resetState);
		updateState(changes);
	};

	context.publish = (updates) => map(updates,
		(data, name) => context.sources[name](data));

	buildResolvers({ config, context });
};

export default {
	config: providerConfig,
	init: init,
};
