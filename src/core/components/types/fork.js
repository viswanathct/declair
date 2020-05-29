const choiceMap = {
	true: 'yes',
	false: 'no',
};
const fork = {
	setup: (setupArgs) => {
		const { render } = setupArgs.type;

		return (props) => {
			const item = props.items()[choiceMap[props.data() !== undefined]];

			return render({
				...props, item,
			});
		};
	},
};

export default fork;
