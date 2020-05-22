// #NOTE: Form doesn't reflect changes to its dependencies, during editing to provide a good UX.
import { assign, clone, map, merge } from '@laufire/utils/collection';

const actions = {
	submit: (data, state) => data(state),
};

/* Helpers*/
const getDataHooks = ({ context, parsing, parsedItems }) =>
	map(parsing.items, (item, key) => {
		const itemProps = parsedItems[key].props;
		const { data: itemData } = itemProps;
		const type = context.types[item.type];

		return type.interactive && !itemProps.target()
			? type.editable
				? (data) => (dataIn) => (dataIn !== undefined
					? data(itemData())
					: itemData())
				: (data) => () => data(itemData())
			: undefined;
	});

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
			const { data } = itemRenderProps;

			return item({
				...itemRenderProps,
				data: dataHooks[key]
					? dataHooks[key](data)
					: parsedItems[key].props.data
						|| getPropsAccessor(data(), key),
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
		const dataCall = dataCallGetter(parserArgs);
		const extract = getDataExtractor(parserArgs);
		const items = getItemRenderers(parserArgs);

		return (props) => {
			const state = getState(extract(props.data)());
			const data = dataCall(state);

			return render({
				...props, data, items,
			});
		};
	},
	interactive: true,
	editable: true,
};

export default form;
