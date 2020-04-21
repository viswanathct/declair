import { doNothing } from '../../core/utils';

const type = {
	props: {
		data: {
			observing: true,
			parse: () => doNothing,
		},
		style: {
			observing: true,
			parse: () => doNothing,
		},
	},
	type: 'uiComponent',
};

export default type;
