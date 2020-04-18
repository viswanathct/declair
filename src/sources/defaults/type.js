const type = {
	setup: ({ config, context }) => {
		typeof config.data !== undefined
			&& context.data(config.data);
	},
};

export default type;
