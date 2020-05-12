// #NOTE: Form data doesn't reflect changes to their dependencies, during editing to provide a good UX.

import { map, merge } from '@laufire/utils/collection';

const actions = {
	submit: (data, cb) => cb(data),
};

const parseItems = ({ context, formData, items, parse, props }) =>
	map(items, (item, key) => {
		const parsed = parse({ parsing: item });
		const { data } = parsed.props;

		parsed.props.data = context.types[item.type].interactive
			? (dataIn) => (dataIn !== undefined
				? actions[data().action](formData, props.data)
				: data())
			: data || ((dataIn) => (dataIn !== undefined
				? (formData[key] = dataIn)
				: formData[key]));

		return parsed;
	});

export default {
	props: {
		items: {
			default: {},
			normalize: ({ prop, normalize }) => map(prop, normalize),
		},
	},
	parse: (args) => {
		const { context, parse, parsing, props } = args;
		const { items } = parsing;
		const state = {};
		const formData = {};
		const init = () => !state.init
			&& merge(formData, props.data()) && (state.init = true);
		const parsedItems = parseItems({
			items, context, formData, parse, props,
		});

		props.items = () => {
			init();
			return map(parsedItems, (item) => context.mount(item));
		};
	},
	interactive: true,
	editable: true,
};
