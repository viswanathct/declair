// #NOTE: Form doesn't reflect changes to its dependencies, during editing to provide a good UX.

import { merge } from '@laufire/utils/collection';
import { dataExtractor, hasActions } from '../../utils';

const actions = {
	submit: (target, state) => target(state),
};

/* Helpers*/
const getTargetCall = (parserArgs) => (state, renderProps) => {
	const { config, parsing, props } = parserArgs;
	const { data, target } = { ...renderProps, ...props };

	return hasActions(config, parsing.target)
		? (dataIn) => actions[dataIn.action](target, merge(
			{}, data(), { data: state() }
		))
		: (dataIn) => actions[dataIn.action](target, state());
};

/* Exports */
const form = {
	setup: (parserArgs) => {
		const { getState } = parserArgs.context;
		const { render } = parserArgs.type;
		const targetCall = getTargetCall(parserArgs);
		const extract = dataExtractor(parserArgs);

		return (props) => {
			const data = getState(extract(props.data));
			const target = targetCall(data, props);

			return render({ ...props, data, target });
		};
	},
	editable: true,
};

export default form;
