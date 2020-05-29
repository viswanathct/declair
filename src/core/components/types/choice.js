const choice = {
	props: {
		item: {
			parse: ({ props }) =>
				() => props.items()[props.data()],
		},
	},
};

export default choice;
