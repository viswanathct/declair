import { map } from '@laufire/utils/collection';
import { doNothing } from '../../utils';

const itemProps = (action) => (data) => ({
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
		const action = props.actions ? data : doNothing;
		const itemRenderProps = itemProps(action);

		props.items = () =>
			map(getData(), (itemData) => context.mount({
				...item,
				props: {
					...itemRenderProps(itemData),
					...item.props,
				},
			}));
	},
};
