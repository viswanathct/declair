import { has, traverse, walk } from '@laufire/utils/collection';
import { inferType } from '@laufire/utils/reflection';

/* Helpers */
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

const resolverBuilder = (context, prop) =>
	(context.sources[prop]
		? (data) => (data !== undefined
			? context.sources[prop].parsed.update(data)
			: context.state[prop])
		: () => prop);

const buildResolutionTree = (context, prop) =>
	(inferType(prop) !== 'object'
		? resolverBuilder(context, prop)
		: traverse(prop, (value) => resolverBuilder(context, value)));

const resolve = (resolutionTree, data) =>
	(inferType(resolutionTree) !== 'object'
		? resolutionTree(data)
		: traverse(resolutionTree, (propResolver) => propResolver(data)));

const getTreeResolver = (worker, resolutionTree) =>
	(data) => worker(resolve(resolutionTree, data));

/* Exports */
const getResolver = (
	context, prop, worker
) => {
	const hasSource = hasSourceWorker(context.sources, prop);
	const resolutionTree = hasSource
		? buildResolutionTree(context, prop)
		: null;

	const resolver = hasSource
		? getTreeResolver(worker, resolutionTree)
		: () => worker(prop);

	return { hasSource, resolver };
};

export default getResolver;
