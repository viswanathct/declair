const choiceMap = {
	true: 'yes',
	false: 'no',
};

/* Exports */
const fork = {
	props: {
		item: {
			parse: ({ props }) =>
				() => props.items()[choiceMap[props.data() !== undefined]],
		},
	},
};

export default fork;
