// #NOTE: Form data doesn't reflect changes to their dependencies, during editing to provide a good UX.

import { map, merge } from '@laufire/utils/collection';
import { setupHook } from '../../utils';

const getActionable = ({ context, items, parsed }) =>
	map(items, (item, key) => {
		const parsedProps = parsed[key].props;
		const type = context.types[item.type];

		return type.interactive && !parsedProps.target()
			? type.editable
				? (action) => (dataIn) => (dataIn !== undefined
					? action(parsedProps.data())
					: parsedProps.data())
				: (action) => () => action(parsedProps.data())
			: undefined;
	});

const actions = {
	submit: (data, formData) => data(formData),
};

const getTargetActions = ({ config, props }) =>
	props.target() && config.sources[props.target()]?.actions?.length;

const getAction = ({ data, formData, renderProps, targetHasActions }) =>
	(targetHasActions
		? (dataIn) => actions[dataIn.action](renderProps.data, merge(
			{}, data(), { data: formData }
		))
		: (dataIn) => actions[dataIn.action](renderProps.data, formData));

const getPropsAccessor = (formData, key) => (dataIn) =>
	(dataIn !== undefined
		? merge(formData, { [key]: dataIn })
		: formData[key]);

const getItemsCall = (args) => {
	const { context, parse, parsing, props, renderProps } = args;
	const { items } = parsing;
	const { data } = props;
	const parsed = map(items, (item) => parse({ parsing: item }));
	const itemsToHook = getActionable({ context, items, parsed });
	const targetHasActions = getTargetActions(args);

	return () => {
		const formData = merge({},
			targetHasActions ? renderProps.data().data : renderProps.data());
		const action = getAction({ data, formData,
			renderProps, targetHasActions });

		return map(parsed, (item, key) => context.mount({
			...item, props: { ...item.props,
				data: itemsToHook[key]
					? itemsToHook[key](action)
					: item.props.data || getPropsAccessor(formData, key) },
		}));
	};
};

export default {
	parse: (parserArgs) => {
		const renderProps = setupHook(parserArgs, (hookedProps) => hookedProps);

		parserArgs.props.items = getItemsCall({
			renderProps, ...parserArgs,
		});

		return parserArgs;
	},
	interactive: true,
	editable: true,
};
