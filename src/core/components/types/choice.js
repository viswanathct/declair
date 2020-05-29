const choice = {
	setup: (setupArgs) => {
		const { render } = setupArgs.type;

		return (props) => {
			const item = props.items()[props.data()];

			return render({
				...props, item,
			});
		};
	},
};

export default choice;
