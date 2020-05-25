import { doNothing } from '../../core/utils';

/* Exports */
const type = {
	props: {
		actions: {},
	},
	normalize: doNothing,
	parse: doNothing,
	simple: true,
	setup: doNothing,
	type: 'source',
};

export default type;
