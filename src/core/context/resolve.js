const getResolver = (
	context, prop, worker
) => {
	const hasSource = !!context.sources[prop];
	const resolver = hasSource
		? () => worker(context.state[prop])
		: () => worker(prop);

	return { hasSource, resolver };
};

export default getResolver;
