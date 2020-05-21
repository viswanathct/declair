// #NOTE: Form doesn't reflect changes to its dependencies, during editing to provide a good UX.

import { assign, clone, map, merge } from '@laufire/utils/collection';

const getDataHooks = ({ context, parsing, parsed }) =>
	map(parsing.items, (item, key) => {
		const parsedProps = parsed[key].props;
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

const getTargetActions = ({ config, props }) =>
	Boolean(props.target())
	&& config.sources[props.target()]?.actions?.length > 0;

const getAction = (parserArgs) => {
	const { data } = parserArgs.props;
	const targetHasActions = getTargetActions(parserArgs);

	return targetHasActions
		? (dataIn, state) => actions[dataIn.action](data, merge(
			{}, data(), { data: state }
		))
		: (dataIn, state) => actions[dataIn.action](data, state);
};

const usesExternalData = ({ parserArgs, data }) =>
	parserArgs.props.data !== data;

const getDataExtractor = (parserArgs) => (data) => () =>
	clone(usesExternalData({ parserArgs, data }) ? data() : data().data) || {};

const getPropsAccessor = (state, key) => (dataIn) =>
	(dataIn !== undefined
		? assign(state, { [key]: dataIn })
		: state[key]);

const getItemRenderers = (parserArgs) => {
	const { context, parsing, parse } = parserArgs;
	const parsed = map(parsing.items, (item) => parse({ parsing: item }));
	const dataHooks = getDataHooks({ ...parserArgs, parsed });
	const itemTemplates = map(parsed, context.mount);

	return map(itemTemplates, (item, key) => {
		const Item = (itemRenderProps) => {
			const { action, state } = itemRenderProps;

			return item({
				...itemRenderProps,
				data: dataHooks[key]
					? dataHooks[key](action, state)
					: parsed[key].props.data
						|| getPropsAccessor(state, key),
			});
		};

		return Item;
	});
};

/* Exports */
const form = {
	setup: (parserArgs) => {
		const { props } = parserArgs;
		const action = getAction(parserArgs);
		const dataExtractor = getDataExtractor(parserArgs);
		const items = getItemRenderers(parserArgs);
		const { render } = parserArgs.type;

		return ({ data }) => render({
			...props,
			action: action,
			data: dataExtractor(data),
			items: items,
		});
	},
	interactive: true,
	editable: true,
};

export default form;
