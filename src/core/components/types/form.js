// #NOTE: Form doesn't reflect changes to its dependencies, during editing to provide a good UX.

import { merge } from '@laufire/utils/collection';

const actions = {
	submit: (target, data) => target(data),
};

/* Helpers*/
const targetBuilder = (parserArgs) => (state, renderProps) => {
	const { props } = parserArgs;
	const { action } = props;
	const { target } = { ...renderProps, ...props };

	return action
		? (value) => actions[value.action](target,
			merge({ action: action() }, { data: state() }))
		: (value) => actions[value.action](target, state());
};

const getData = (state) => (value) =>
	(value !== undefined
		? state({ ...state(), ...value })
		: state());

/* Exports */
const form = {
	setup: (parserArgs) => {
		const { getState } = parserArgs.context;
		const { render } = parserArgs.type;
		const getTarget = targetBuilder(parserArgs);

		return (props) => {
			const state = getState(props.data);
			const data = getData(state);
			const target = getTarget(state, props);

			return render({ ...props, data, target });
		};
	},
};

export default form;
