/**
 * Helps in spinning up an app with default providers and customizations.
 */

import { merge } from '@laufire/utils/collection';

import entry from './core/entry';
import reactState from './reactState';
import sources from './sources';
import native from './native';
import router from './router';

/* Data */
const providers = { native, router, reactState, sources };

/* Exports */
const quick = (extensions) =>
	entry(merge(
		{}, { providers }, extensions
	));

export default quick;
