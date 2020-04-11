import { merge, pick, spread } from '@laufire/utils/collection';

export default {
	config: {
		data: {},
		items: {},
		type: 'element',
	},
	normalize: (config) =>
		spread(config.items,
			{ data: merge(config.data, pick(config.items, 'data')) }),
};
