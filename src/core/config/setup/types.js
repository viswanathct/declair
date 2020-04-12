import { merge, pick } from '@laufire/utils/collection';
import coreTypes from '../types';

/* Exports */
const setup = (context) => {
	const providerTypes = merge({},
		...pick(pick(context.providers, 'config'), 'types'));

	context.types = merge(
		{}, coreTypes, providerTypes, context.types
	);
};

export default setup;
