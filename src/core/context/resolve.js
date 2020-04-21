import { has, traverse, walk } from '@laufire/utils/collection';
import { isObject, inferType } from '@laufire/utils/reflection';

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

const resolverBuilder = ({ config, context, prop }) =>
	(config.sources[prop]
		? (data) => context.sources[prop](data)
		: () => prop);

const buildResolutionTree = ({ config, context, prop }) =>
	(isObject(prop)
		? traverse(prop, (value) => resolverBuilder({ config: config,
			context: context,
			prop: value }))
		: resolverBuilder({ config, context, prop })
	);

const resolve = (resolutionTree, data) =>
	(isObject(resolutionTree)
		? traverse(resolutionTree, (propResolver) => propResolver(data))
		: resolutionTree(data)
	);

const getTreeResolver = (worker, resolutionTree) =>
	(data) => worker(resolve(resolutionTree, data));

/* Exports */
const getResolver = (
	config, context, prop, worker
) => {
	const hasSource = hasSourceWorker(config.sources, prop);
	const resolutionTree = hasSource
		? buildResolutionTree({ config, context, prop })
		: null;

	const resolver = hasSource
		? getTreeResolver(worker, resolutionTree)
		: () => worker(prop);

	return { hasSource, resolver };
};

export default getResolver;
