const type = {
	props: {
		data: {
			parse: ({ config, context, name, prop }) =>
				(config.sources[prop]
					? (data) => context.sources[prop](data)
					: (data) => (data !== undefined
						? context.publish({ [name]: data })
						: context.state[name])),
			observing: false,
		},
	},
	setup: ({ data }) => (value) => data(value),
};

export default type;
