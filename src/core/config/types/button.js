export default {
	props: {
		available: {
			default: true,
			parse: ({ prop }) => () => Boolean(prop),
		},
		label: {
			default: 'Button',
		},
		target: {
			parse: ({ prop }) => () => prop,
		},
	},
	parse: ({ context, props, inherited }) => {
		if(props.target()) {
			props.action = (data) =>
				() => context.publish({ [props.target()]: data() });
		}
		else if(inherited.action)
			props.action = inherited.action;
	},
};
