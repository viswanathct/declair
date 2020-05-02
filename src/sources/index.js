import providerTypes from './types';
import { filter, map, pick, select, traverse } from '@laufire/utils/collection';
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
			: cb(dataIn));

/* Exports */
const providerConfig = {
	types: providerTypes,
};

const init = ({ config, context }) => {
	context.publish = (updates) => map(updates,
		(data, name) => context.sources[name](data));

	context.dependency = getDependents(map(config.sources, (source) => {
		const type = context.types[source.type];
		const dependencies = [];

		traverse(select(source, type.props), (value) =>
			context.isObservable(value) && dependencies.push(value));

		return unique(dependencies);
	}));

	context.sources = map(config.sources, (source, name) =>
		getResolver(
			context, name, context.types[source.type]
				.setup(context.sources[name].props)
		));

	context.publish(pick(filter(config.sources, (source) =>
		source.data !== undefined
		&& !context.isObservable(source.data)), 'data'));
};

export default {
	config: providerConfig,
	init: init,
};
