// #NOTE: Form doesn't reflect changes to its dependencies, during editing to provide a good UX.

import { merge } from '@laufire/utils/collection';

const actions = {
	submit: (target, data) => target(data),
};

/* Helpers*/
const targetCall = (parserArgs) => (data, renderProps) => {
	const { props } = parserArgs;
	const { action } = props;
	const { target } = { ...renderProps, ...props };

	return action
		? (dataIn) => actions[dataIn.action](target,
			merge({ action: action() }, { data: data() }))
		: (dataIn) => actions[dataIn.action](target, data());
};

/* Exports */
const form = {
	setup: (parserArgs) => {
		const { getState } = parserArgs.context;
		const { render } = parserArgs.type;
		const getTarget = targetCall(parserArgs);

		return (props) => {
			const data = getState(props.data);
			const target = getTarget(data, props);

			return render({ ...props, data, target });
		};
	},
	editable: true,
};

export default form;
