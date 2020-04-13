import { map } from '@laufire/utils/collection';

/* Helpers */
const parseChildren = (context, mountWorker) => {
	const children = map(context.items, (itemContext) =>
		({ state }) => mountWorker({
			...itemContext,
			state: context.state,
			getData: itemContext.source
				? () => context.state[itemContext.source]
				: () => itemContext.data,
		})({ state }));

	return { children };
};

/* Exports */
const mount = ({ hook, structure, types }) => {
	const mountWorker = (context) => {
		const childContext = {
			...context,
			...context.type !== 'element'
				? {}
				: parseChildren(context, mountWorker),
		};

		return hook(types[context.type].setup(childContext),
			childContext);
	};

	return (state) => mountWorker({ ...structure, state });
};

export default mount;
