const button = {
	props: {
		label: {
			default: 'Button',
		},
	},
	setup: (parserArgs) => {
		const { render } = parserArgs.type;

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
