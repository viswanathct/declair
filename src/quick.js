/**
 * Helps in spinning up the app with default providers.
 */

import entry from 'declair/core/entry';
import native from 'declair/native';

/* Data */
const providers = [native];

/* Exports */
const quick = (props) =>
	entry({ providers, ...props });

export default quick;
