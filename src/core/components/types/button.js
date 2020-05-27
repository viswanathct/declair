import { targetCall } from '../../utils';

const button = {
	props: {
		label: {
			default: 'Button',
		},
	},
	setup: (setupArgs) => {
		const { render } = setupArgs.type;

		return (props) => {
			const target = targetCall(props);

			return render({
				...props, target,
			});
		};
	},
};

export default button;
