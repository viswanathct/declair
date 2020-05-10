// #TODO: Form data shouldn't reflect changes at the source, during editing to provide a good UX.

import { map, merge } from '@laufire/utils/collection';

const itemToMount = ({ formData, key }) => ({
	data: (dataIn) => (dataIn !== undefined
		? (formData[key] = dataIn)
		: formData[key]),
});

const actions = {
	submit: (data, cb) => cb(data),
};

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
		const action = (data) => () =>
			actions[data().action](formData, props.data);
		const parsedItems = map(items, (item) =>
			parse({ parsing: item, inherited: { action }}));

		props.items = () => map(parsedItems, (item, key) => {
			init();

			return context.mount(item)(itemToMount({
				formData, key,
			}));
		});
	},
};
