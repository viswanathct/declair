import { map } from '@laufire/utils/collection';

const itemToMount = (
	data, item, mount
) => mount({
	...item,
	props: {
		...item.props,
		data: () => data,
	},
});

export default {
	props: {
		data: {
			default: {},
		},
		item: {
			default: {},
			normalize: ({ prop, normalize }) => normalize(prop),
			parse: ({ parse, prop }) => parse({ parsing: prop }),
		},
	},
	parse: (args) => {
		const { context, props } = args;
		const { data, item } = props;

		props.items = () =>
			map(data(), (itemData) => itemToMount(
				itemData, item, context.mount
			));
	},
};
