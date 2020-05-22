// #NOTE: Form doesn't reflect changes to its dependencies, during editing to provide a good UX.
import { assign, clone, map, merge } from '@laufire/utils/collection';

const getDataHooks = ({ context, parsing, parsedItems }) =>
	map(parsing.items, (item, key) => {
		const parsedProps = parsedItems[key].props;
		const type = context.types[item.type];

		return type.interactive && !parsedProps.target()
			? type.editable
				? (action, state) => (dataIn) => (dataIn !== undefined
					? action(parsedProps.data(), state)
					: parsedProps.data())
				: (action, state) => () => action(parsedProps.data(), state)
			: undefined;
	});

const actions = {
	submit: (data, state) => data(state),
};

const targetHasActions = ({ config, props }) =>
	Boolean(props.target())
	&& config.sources[props.target()]?.actions?.length > 0;

const getAction = (parserArgs) => {
	const { data } = parserArgs.props;

	return targetHasActions(parserArgs)
		? (dataIn, state) => actions[dataIn.action](data, merge(
			{}, data(), { data: state }
		))
		: (dataIn, state) => actions[dataIn.action](data, state);
};

const usesExternalData = ({ parserArgs, data }) =>
	parserArgs.props.data !== data;

const getDataExtractor = (parserArgs) => (data) => () =>
	clone(usesExternalData({ parserArgs, data })
		|| !targetHasActions(parserArgs)
		? data()
		: data().data) || {};

const getPropsAccessor = (state, key) => (dataIn) =>
	(dataIn !== undefined
		? assign(state, { [key]: dataIn })
		: state[key]);

const getItemRenderers = (parserArgs) => {
	const { context, props } = parserArgs;
	const parsedItems = props.items();
	const dataHooks = getDataHooks({ ...parserArgs, parsedItems });
	const itemTemplates = map(parsedItems, context.mount);

	return map(itemTemplates, (item, key) => {
		const Item = (itemRenderProps) => {
			const { action, state } = itemRenderProps;

			return item({
				...itemRenderProps,
				data: dataHooks[key]
					? dataHooks[key](action, state)
					: parsedItems[key].props.data
						|| getPropsAccessor(state, key),
			});
		};

		return Item;
	});
};

/* Exports */
const form = {
	setup: (parserArgs) => {
		const { getState } = parserArgs.context;
		const { render } = parserArgs.type;
		const action = getAction(parserArgs);
		const dataExtractor = getDataExtractor(parserArgs);
		const items = getItemRenderers(parserArgs);

		return (props) => {
			const state = getState(dataExtractor(props.data)());

			return render({
				...props,
				action: action,
				state: state(),
				items: items,
			});
		};
	},
	interactive: true,
	editable: true,
};

export default form;
