import mount from 'declair/core/mount';
import types from './types';

const config = {
	types,
};

const setup = (context) => {
	context.next(context);

	return {
		structure: mount(context),
	};
};

export default {
	config,
	setup,
};
