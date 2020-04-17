const type = {
	setup: ({ context }) => {
		typeof context.data !== undefined
			&& context.parsed.update(context.data);
	},
};

export default type;
