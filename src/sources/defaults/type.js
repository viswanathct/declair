const type = {
	setup: ({ context }) => {
		typeof context.value !== undefined
			&& context.parsed.update(context.value);
	},
};

export default type;
