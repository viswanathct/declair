import { interactive } from '../classes';

export default {
	props: {
		...interactive,
		available: {
			default: true,
			parse: ({ prop }) => () => Boolean(prop),
		},
		label: {
			default: 'Button',
		},
	},
};
