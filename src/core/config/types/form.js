// #NOTE: Form doesn't reflect changes to its dependencies, during editing to provide a good UX.

import { merge } from '@laufire/utils/collection';
import { defined } from '../../utils';

const actions = {
	submit: (target, state) => target(state),
};

/* Helpers*/
const targetHasActions = ({ config, parsing }) =>
	parsing.target && config.sources[parsing.target]?.actions?.length > 0;

const getTargetCall = (parserArgs) => (state, renderProps) => {
	const { data, target } = { ...renderProps, ...parserArgs.props };

	return targetHasActions(parserArgs)
		? (dataIn) => actions[dataIn.action](target, merge(
			{}, data(), { data: state() }
		))
		: (dataIn) => actions[dataIn.action](target, state());
};

const usesExternalData = ({ parserArgs, data }) =>
	parserArgs.props.data !== data;

const getDataExtractor = (parserArgs) => (data) => (data
	? usesExternalData({ parserArgs, data }) || !targetHasActions(parserArgs)
		? defined(data(), {})
		: defined(data().data, {})
	: {});

/* Exports */
const form = {
	setup: (parserArgs) => {
		const { getState } = parserArgs.context;
		const { render } = parserArgs.type;
		const targetCall = getTargetCall(parserArgs);
		const extract = getDataExtractor(parserArgs);

		return (props) => {
			const data = getState(extract(props.data));
			const target = targetCall(data, props);

			return render({ ...props, data, target });
		};
	},
	editable: true,
};

export default form;
