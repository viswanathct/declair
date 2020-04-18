const type = {
	setup: ({ config, context }) => {
		typeof config.data !== undefined
			&& context.update(config.data);
	},
};

export default type;
