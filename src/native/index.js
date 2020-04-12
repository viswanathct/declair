import mount from 'declair/core/mount';
import normalize from 'declair/core/config/normalize';
import types from './types';

const config = {
	types,
};

const setup = (context) => {
	context.next(context);

	return {
		structure: mount({
			...context,
			...normalize({ context, types }),
		}),
	};
};

export default {
	config,
	setup,
};
