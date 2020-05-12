import { map } from '@laufire/utils/collection';

const itemRenderProps = ({ action, data }) => ({
	action: () => (renderProps) => {
		const messageData = {
			id: data.id,
			...renderProps.data()?.data,
		};

		return renderProps.action
			? action({
				action: renderProps.action(),
				data: messageData,
			})
			: action(messageData);
	},
	data: () => data,
});

export default {
	props: {
		data: {},
		item: {
			default: {},
			normalize: ({ prop, normalize }) => normalize(prop),
			parse: ({ parse, prop }) => parse({
				parsing: prop,
			}),
		},
	},
	parse: (args) => {
		const { context, props } = args;
		const { action, data, item } = props;
		const getData = props.actions
			? () => data().data
			: data;

		props.items = () =>
			map(getData(), (itemData) => context.mount(item)(itemRenderProps({
				action: action,
				data: itemData,
			})));
	},
};
