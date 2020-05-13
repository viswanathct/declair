// #NOTE: Form data doesn't reflect changes to their dependencies, during editing to provide a good UX.

import { map, merge } from '@laufire/utils/collection';
import { once, setupHook } from '../../utils';

const parseItems = ({ context, items, parsed }) =>
	map(items, (item, key) => {
		const parsedProps = parsed[key].props;
		const type = context.types[item.type];

		return parsedProps.target()
			? type.editable
				? (parentData) => (dataIn) => (dataIn !== undefined
					? parentData(parsedProps.data())
					: parsedProps.data())
				: (parentData) => () => parentData(parsedProps.data())
			: undefined;
	});

const actions = {
	submit: (data, formData) => data(formData),
};

const getTargetActions = ({ config, props }) =>
	config.sources[props.target()].actions;

export default {
	parse: (parserArgs) => { // eslint-disable-line max-lines-per-function, max-statements
		const { context, parse, parsing, props } = parserArgs;
		const { items } = parsing;
		const parsed = map(items, (item) => parse({ parsing: item }));
		const targetActions = getTargetActions(parserArgs);
		const formData = {};
		const init = once(() => merge(formData,
			targetActions ? props.data().data : props.data()));
		const renderProps = setupHook(parserArgs, (hookedProps) => {
			init();
			return hookedProps;
		});
		const dataHooks = parseItems({ context, items, parsed });
		const action = targetActions
			? (dataIn) =>
				actions[dataIn.action](renderProps.data, merge(
					{}, props.data(), { data: formData }
				))
			: (dataIn) =>
				actions[dataIn.action](renderProps.data, formData);

		props.items = () => map(parsed, (item, key) =>
			context.mount({
				...item, props: {
					...item.props,
					data: dataHooks[key]
						? dataHooks[key](action)
						: item.props.data || ((dataIn) =>
							(dataIn !== undefined
								? merge(formData, { [key]: dataIn })
								: formData[key])),
				},
			}));

		return parserArgs;
	},
	interactive: true,
	editable: true,
};
