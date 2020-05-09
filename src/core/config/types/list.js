import { map } from '@laufire/utils/collection';

const itemRenderProps = ({ action, data }) => ({
	action: (message) => () => action({
		...message(),
		data: {
			id: data.id,
			...message().data,
		},
	}),
	data: () => data,
});

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
		const actionProps = { ...props.actions ? { action: data } : {}};

		props.items = () =>
			map(getData(), (itemData) => context.mount(item)(itemRenderProps({
				...actionProps,
				data: itemData,
			})));
	},
};
