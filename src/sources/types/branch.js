/**
 * Helps accessing properties of complex sources.
 */

const branch = {
	props: {
		branch: {
			parse: ({ prop }) => () => prop,
		},
		data: {
			parse: (args) => {
				const { props, resolver } = args;
				const data = resolver(args);

				return () => data()[props.branch()];
			},
		},
	},
	setup: ({ data }) => data,
};

export default branch;
