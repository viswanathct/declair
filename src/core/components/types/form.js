// #NOTE: Form doesn't reflect changes to its dependencies, during editing to provide a good UX.

import { targetCall } from '../../utils';

const actions = {
	submit: (target) => target(),
};

/* Helpers*/
const targetHook = (providedTarget) =>
	(value) => actions[value.action](providedTarget);

const getData = (state) => (value) =>
	(value !== undefined
		? state({ ...state(), ...value })
		: state());

/* Exports */
const form = {
	setup: (parserArgs) => {
		const { getState } = parserArgs.context;
		const { render } = parserArgs.type;

		return (props) => {
			const { action, target } = props;
			const state = getState(props.data);
			const data = getData(state);
			const providedTarget = targetCall({ action, target, data });

			return render({ ...props,
				data: data,
				target: targetHook(providedTarget) });
		};
	},
};

export default form;
