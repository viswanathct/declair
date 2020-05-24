const type = {
	props: {
		data: {
			parse: (args) => {
				const { prop, resolver } = args;

				return prop !== undefined ? resolver(args) : undefined;
			},
		},
	},
};

export default type;
