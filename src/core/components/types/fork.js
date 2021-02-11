const choiceMap = {
	true: 'present',
	false: 'absent',
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
