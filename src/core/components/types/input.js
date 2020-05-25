import { defined } from '../../../core/utils';

const input = {
	setup: (setupArgs) => (props) => {
		const { data, target } = props;
		const state = setupArgs.context.getState();

		return setupArgs.type.render({
			...props,
			data: () => defined(data(), '').toString(),
			target: (value) => {
				state(value);
				target(value);
			},
		});
	},
};

export default input;
