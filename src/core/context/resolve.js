import { traverse } from '@laufire/utils/collection';
import { isIterable } from '@laufire/utils/reflection';

/* Helpers */
const valueResolver = ({ context, prop }) =>
	(context.isObservable(prop)
		? (data) => context.sources[prop](data)
		: () => prop);

const iterableResolver = ({ context, prop }) => {
	const tree = resolutionTree({ context, prop }); // eslint-disable-line no-use-before-define

	return (data) => traverse(tree, (resolver) => resolver(data));
};

const buildResolver = ({ context, prop }) =>
	(isIterable(prop)
		? iterableResolver
		: valueResolver)({ context, prop });

/* Exports */
const resolutionTree = ({ context, prop }) =>
	traverse(prop, (value) => valueResolver({
		context: context,
		prop: value,
	}));

const resolver = ({ context, inherited, prop }) =>
	(prop !== undefined
		? buildResolver({ context, prop })
		: inherited);

export { resolver, resolutionTree };
