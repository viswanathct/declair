import { has, traverse, walk } from '@laufire/utils/collection';
import { inferType } from '@laufire/utils/reflection';

const hasSourceProcessors = {
	string: (sources, prop) => !!sources[prop],
	object: (sources, prop) => has(walk(prop,
		(value) => hasSourceWorker(sources, value)), true), // eslint-disable-line no-use-before-define
};

const hasSourceWorker = (sources, prop) => {
	const processor = hasSourceProcessors[inferType(prop)];

	return processor
		? processor(sources, prop)
		: false;
};

const resolveProcessors = {
	string: (state, prop) => state[prop],
	object: (state, prop) =>
		traverse(prop, (value) => resolve(state, value)), // eslint-disable-line no-use-before-define
};

const resolve = (state, prop) => {
	const processor = resolveProcessors[inferType(prop)];

	return processor
		? processor(state, prop)
		: prop;
};

const getResolver = (
	context, prop, worker
) => {
	const hasSource = hasSourceWorker(context.sources, prop);
	const resolver = hasSource
		? (() => () => worker(resolve(context.state, prop)))()
		: () => worker(prop);

	return { hasSource, resolver };
};

export default getResolver;
