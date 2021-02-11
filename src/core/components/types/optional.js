const choiceMap = {
	true: 'present',
	false: 'absent',
};

/* Exports */
const optional = {
	props: {
		item: {
			parse: ({ props }) =>
				() => props.items()[choiceMap[props.data() !== undefined]],
		},
	},
};

export default optional;
