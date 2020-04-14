/**
 * Helps in spinning up the app with default providers.
 */

import entry from './core/entry';
import mobxReact from './mobxReact';
import sources from './sources';
import native from './native';

/* Data */
const providers = [mobxReact, sources, native];

/* Exports */
const quick = (props) =>
	entry({ providers, ...props });

export default quick;
