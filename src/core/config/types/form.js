import { map, merge } from '@laufire/utils/collection';
import { interactive } from '../classes';

/* Helpers */
const itemToMount = ({ formData, key, action }) => {
	const data = (dataIn) => (dataIn !== undefined
		? (formData[key] = dataIn)
		: formData[key]);

	return {
		action: () => () =>
			actions[key](action(() => formData)), // eslint-disable-line no-use-before-define
		data: data,
	};
};

const actions = {
	submit: (cb) => cb(),
};

export default {
	props: {
		...interactive,
		items: {
			default: {},
			normalize: ({ prop, normalize }) => map(prop, normalize),
		},
	},
	parse: (args) => {
		const { context, parse, parsing, props } = args;
		const { data, action } = props;
		const { items } = parsing;
		const formData = {};

		const state = {};
		const init = () => !state.init
			&& merge(formData, data()) && (state.init = true);

		const parsedItems = map(items, (item) =>
			parse({ parsing: item }));

		props.items = () => map(parsedItems, (item, key) => {
			init();

			return context.mount(item)(itemToMount({
				formData, key, action,
			}));
		});
	},
};
