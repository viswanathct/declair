import mount from 'declair/core/mount';
import normalize from 'declair/core/config/normalize';
import types from './types';

const setup = (config) => {
	config.next(config);

	return {
		structure: mount({
			...config,
			...normalize({ config, types }),
		}),
	};
};

export default setup;
