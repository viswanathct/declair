/**
 * Helps in spinning up the app with default providers.
 */

import entry from './core/entry';
import reactState from './reactState';
import sources from './sources';
import native from './native';

/* Data */
const providers = { native, sources, reactState };

/* Exports */
const quick = (props) =>
	entry({ providers, ...props });

export default quick;
