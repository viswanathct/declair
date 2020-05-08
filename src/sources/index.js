import providerTypes from './types';
import { combine, compose, filter, map,
	pick, values } from '@laufire/utils/collection';
import { isIterable } from '@laufire/utils/reflection';

/* Helpers */
const delegateToSource = (
	context, cb, data, name
) => {
	const returned = cb(data);

	if(returned !== undefined)
		context.updateState({ [name]: returned });
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
	context.publish = (updates) => {
		const dependents = combine([],
			...values(compose(updates, context.dependencyMap)));

		map(dependents, (dependent) => (context.state[dependent] = undefined));

		return map(updates,
			(data, name) => context.sources[name](data));
	};

	buildResolvers({ config, context });

	context.publish(pick(filter(config.sources, (source) =>
		source.data !== undefined
		&& !context.isObservable(source.data)
		&& !isIterable(source.data)), 'data'));
};

export default {
	config: providerConfig,
	init: init,
};
