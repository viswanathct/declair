import { defined } from '../../../core/utils';

const text = {
	setup: (setupArgs) => (props) => {
		const { data } = props;

		return setupArgs.type.render({
			...props,
			data: () => defined(data(), '').toString(),
		});
	},
};

export default text;
