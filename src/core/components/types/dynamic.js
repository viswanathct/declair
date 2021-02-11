const dynamic = {
	props: {
		item: {
			parse: ({ props }) =>
				() => props.items()[props.data()],
		},
	},
};

export default dynamic;
