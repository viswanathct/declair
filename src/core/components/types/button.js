const button = {
	props: {
		label: {
			default: 'Button',
		},
	},
	setup: (setupArgs) => {
		const { render } = setupArgs.type;

		return (props) => {
			const { data, target } = props;

			return render({
				...props,
				target: () => target(data()),
			});
		};
	},
};

export default button;
