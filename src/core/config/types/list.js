import { map } from '@laufire/utils/collection';

const itemToMount = (
	data, item, mount
) => mount(item)({ data: () => data });

export default {
	props: {
		data: {},
		item: {
			default: {},
			normalize: ({ prop, normalize }) => normalize(prop),
			parse: ({ parse, prop }) => parse({ parsing: prop }),
		},
	},
	parse: (args) => {
		const { context, props } = args;
		const { data, item } = props;
		const getData = props.actions
			? () => data().data
			: data;

		props.items = () =>
			map(getData(), (itemData) => itemToMount(
				itemData, item, context.mount
			));
	},
};
