export default {
	props: {
		action: {
			parse: (args) => {
				const { context, prop, resolver } = args;
				const data = resolver({
					...args,
					prop: prop.data,
				});

				return () => () => context.publish({ [prop.target]: data() });
			},
		},
		available: {
			default: true,
			parse: ({ prop }) => () => Boolean(prop),
		},
	},
};
