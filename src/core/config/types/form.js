// #NOTE: Form doesn't reflect changes to its dependencies, during editing to provide a good UX.
import { clone, merge } from '@laufire/utils/collection';
import getItemRenderers from '../parsers/items';

const actions = {
	submit: (data, state) => data(state),
};

/* Helpers*/
const targetHasActions = ({ config, props }) =>
	Boolean(props.target())
	&& config.sources[props.target()]?.actions?.length > 0;

const dataCallGetter = (parserArgs) => (state) => {
	const { data } = parserArgs.props;

	return targetHasActions(parserArgs)
		? (dataIn) => (dataIn !== undefined
			? actions[dataIn.action](data, merge(
				{}, data(), { data: state() }
			))
			: state())
		: (dataIn) => (dataIn !== undefined
			? actions[dataIn.action](data, state)
			: state());
};

const usesExternalData = ({ parserArgs, data }) =>
	parserArgs.props.data !== data;

const getDataExtractor = (parserArgs) => (data) => () =>
	clone(usesExternalData({ parserArgs, data })
		|| !targetHasActions(parserArgs)
		? data()
		: data().data) || {};

/* Exports */
const form = {
	setup: (parserArgs) => {
		const { getState } = parserArgs.context;
		const { render } = parserArgs.type;
		const items = getItemRenderers(parserArgs);
		const dataCall = dataCallGetter(parserArgs);
		const extract = getDataExtractor(parserArgs);

		return (props) => {
			const state = getState(extract(props.data)());
			const data = dataCall(state);

			return render({ ...props, data, items });
		};
	},
	interactive: true,
	editable: true,
};

export default form;
