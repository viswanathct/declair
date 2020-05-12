export default {
	props: {
		available: {
			default: true,
			parse: ({ prop }) => () => Boolean(prop),
		},
		data: {
			parse: (args) => {
				const { context, parsing, props, resolver } = args;
				const data = resolver(args);

				return parsing.target
					? () => context.publish({ [props.target()]: data() })
					: data;
			},
		},
		label: {
			default: 'Button',
		},
		target: {
			parse: ({ prop }) => () => prop,
		},
	},
	interactive: true,
};
