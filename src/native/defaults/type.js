import { doNothing } from '../../core/utils';

const type = {
	props: {
		data: {
			primitive: true,
			parse: () => (data) => data,
		},
		style: {
			primitive: true,
			parse: () => doNothing,
		},
	},
	type: 'uiComponent',
};

export default type;
