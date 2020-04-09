import types from './types';
import { collect } from '@laufire/utils/collection';

/* Exports */
const setup = (props) => {
	const { config, publish } = props;
	const { sources: sourceConfig } = config;
	const sources = collect(sourceConfig, (source, name) =>
		types[source.type]({
			publish: publish,
			source: { name, ...source },
		}));

	return props.next({ ...props, sources });
};

export default setup;
