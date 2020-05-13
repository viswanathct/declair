// #NOTE: Form data doesn't reflect changes to their dependencies, during editing to provide a good UX.

import { map, merge } from '@laufire/utils/collection';
import { once, setupHook } from '../../utils';

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
	config.sources[props.target()].actions;

const getAction = ({ formData, props, parserArgs }) => {
	const targetActions = getTargetActions(parserArgs);
	const init = once(() => merge(formData,
		targetActions ? props.data().data : props.data()));
	const renderProps = setupHook(parserArgs, (hookedProps) => {
		init();
		return hookedProps;
	});

	return targetActions
		? (dataIn) => actions[dataIn.action](renderProps.data, merge(
			{}, props.data(), { data: formData }
		))
		: (dataIn) => actions[dataIn.action](renderProps.data, formData);
};

const getItemsCall = ({ action, context, items, formData, parse }) => {
	const parsed = map(items, (item) => parse({ parsing: item }));
	const itemsToHook = getActionable({ context, items, parsed });

	return () => map(parsed, (item, key) =>
		context.mount({
			...item, props: {
				...item.props,
				data: itemsToHook[key]
					? itemsToHook[key](action)
					: item.props.data || ((dataIn) =>
						(dataIn !== undefined
							? merge(formData, { [key]: dataIn })
							: formData[key])),
			},
		}));
};

export default {
	parse: (parserArgs) => {
		const { context, parse, parsing, props } = parserArgs;
		const { items } = parsing;
		const formData = {};

		const action = getAction({
			formData, props, parserArgs,
		});

		props.items = getItemsCall({
			action, context, items, formData, parse,
		});

		return parserArgs;
	},
	interactive: true,
	editable: true,
};
