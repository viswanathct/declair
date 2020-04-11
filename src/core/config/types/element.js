import { map, merge, pick, spread } from '@laufire/utils/collection';

export default {
	config: {
		data: {},
		items: {},
		type: 'element',
	},
	normalize: (config, normalize) => {
		const { items, data } = config;

		spread(items, { data: merge(data, pick(items, 'data')) });
		config.items = map(items, normalize);
	},
};
