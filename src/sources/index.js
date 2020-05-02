import providerTypes from './types';
import { combine, compose, filter, map,
	pick, select, traverse, values } from '@laufire/utils/collection';
import { unique } from '../core/utils';
import getDependents from './dependencies';

/* Helpers */
const getResolver = (
	context, name, cb
) =>
	(dataIn) => (dataIn !== undefined
		? context.updateState({ [name]: cb(dataIn) })
		: context.state[name] !== undefined
			? context.state[name]
			: (context.state[name] = cb(dataIn)));

const buildDependencyList = ({ config, context }) =>
	getDependents(map(config.sources, (source) => {
		const type = context.types[source.type];
		const dependencies = [];

		traverse(select(source, type.props), (value) =>
			context.isObservable(value) && dependencies.push(value));

		return unique(dependencies);
	}));

const buildResolvers = ({ config, context }) =>
	map(config.sources, (source, name) =>
		getResolver(
			context, name, context.types[source.type]
				.setup(context.sources[name].props)
		));

/* Exports */
const providerConfig = {
	types: providerTypes,
};

const init = ({ config, context }) => {
	context.publish = (updates) => {
		const dependents = combine([],
			...values(compose(updates, context.dependency)));

		map(dependents, (dependent) => (context.state[dependent] = undefined));

		return map(updates,
			(data, name) => context.sources[name](data));
	};

	context.dependency = buildDependencyList({ config, context });
	context.sources = buildResolvers({ config, context });

	context.publish(pick(filter(config.sources, (source) =>
		source.data !== undefined
		&& !context.isObservable(source.data)), 'data'));
};

export default {
	config: providerConfig,
	init: init,
};
