// #TODO: Bring in React to handle the flow, as the implementation is clumsy.
// #NOTE: Form data doesn't reflect changes to their dependencies, during editing to provide a good UX.

import { assign, map, merge, clone } from '@laufire/utils/collection';
import { setupHook } from '../../utils';

const getDataHooks = ({ context, items, parsed }) =>
	map(items, (item, key) => {
		const parsedProps = parsed[key].props;
		const type = context.types[item.type];

		return type.interactive && !parsedProps.target()
			? type.editable
				? (parentData) => (dataIn) => (dataIn !== undefined
					? parentData(parsedProps.data())
					: parsedProps.data())
				: (parentData) => () => parentData(parsedProps.data())
			: undefined;
	});

const actions = {
	submit: (data, state) => data(state),
};

const getTargetActions = ({ config, props }) =>
	Boolean(props.target())
	&& config.sources[props.target()]?.actions?.length > 0;

const getAction = ({ data, renderProps, state, targetHasActions }) =>
	(targetHasActions
		? (dataIn) => actions[dataIn.action](renderProps.data, merge(
			{}, data(), { data: state() }
		))
		: (dataIn) => actions[dataIn.action](renderProps.data, state()));

const getPropsAccessor = (state, key) => (dataIn) =>
	(dataIn !== undefined
		? assign(state(), { [key]: dataIn })
		: state()[key]);

const usesExternalData = ({ renderProps, props }) =>
	renderProps.data !== props.data;

const getInitialData = ({ renderProps, props, targetHasActions }) =>
	clone(usesExternalData({ renderProps, props }) || !targetHasActions
		? renderProps.data()
		: props.data().data) || {};

const getItemRenderers = (args) => {
	const { context, dataHooks, parsed } = args;
	const itemTemplates = map(parsed, context.mount);

	return map(itemTemplates, (item, key) => {
		const Item = (itemRenderProps) => {
			const { action, state } = itemRenderProps.state;

			return item({
				...itemRenderProps,
				data: dataHooks[key]
					? dataHooks[key](action)
					: parsed[key].props.data
							|| getPropsAccessor(state, key),
			});
		};

		return Item;
	});
};

const rendererHook = ({ data, itemRenderers, origRenderer,
	parserArgs, props }) => (renderProps) => {
	const targetHasActions = getTargetActions(parserArgs);

	return origRenderer({ ...renderProps,
		items: () => itemRenderers,
		init: ({ state: providedState }) => {
			const state = () => providedState.data;

			!providedState.data
				&& assign(providedState, {
					data: getInitialData({ renderProps, props,
						targetHasActions }),
					state: state,
					action: getAction({ data, renderProps,
						state, targetHasActions }),
				});
		} });
};

/* Exports */
const form = {
	parse: (parserArgs) => {
		const { config, context, parse, parsing,
			props: parsedProps } = parserArgs;
		const { items } = parsing;
		const { data } = parsedProps;
		const parsed = map(items, (item) => parse({ parsing: item }));
		const dataHooks = getDataHooks({ context, items, parsed });

		setupHook(parserArgs, (setup, props) => {
			const origRenderer = setup(props);
			const propBuffer = [];
			const itemRenderers = getItemRenderers({ config, context, dataHooks,
				propBuffer, parsed, props });

			return rendererHook({ data, itemRenderers,
				origRenderer, props, parserArgs });
		});

		return parserArgs;
	},
	interactive: true,
	editable: true,
};

export default form;
