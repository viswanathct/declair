/**
 * Helps in spinning up the app with default providers.
 */

import entry from 'declair/core/entry';
import reactState from 'declair/reactState';
import sources from 'declair/sources';
import native from 'declair/native';

/* Data */
const providers = [reactState, sources, native];

/* Exports */
const quick = (props) =>
	entry({ providers, ...props });

export default quick;
