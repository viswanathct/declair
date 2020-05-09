import providerTypes from './types';
import { combine, compose, map, values } from '@laufire/utils/collection';

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

	context.updateState = (updates) => {
		const dependents = combine([],
			...values(compose(updates, context.dependencyMap)));

		map(dependents, (dependent) => (context.state[dependent] = undefined));

		updateState(updates);
	};

	context.publish = (updates) => map(updates,
		(data, name) => context.sources[name](data));

	buildResolvers({ config, context });
};

export default {
	config: providerConfig,
	init: init,
};
