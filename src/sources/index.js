import types from './types';
import { collect, filter, merge } from '@laufire/utils/collection';

/* Exports */
const setup = (props) => {
	const { config, publish } = props;
	const { sources: sourceConfig } = config;
	const sourceTypes = filter(merge(
		{}, config.types, types
	), (type) => type.type === 'source',);
	const sources = collect(sourceConfig, (source, name) => {
		const type = sourceTypes[source.type];

		return type.handler({
			publish: publish,
			source: { name, ...merge(
				{}, type.config, source
			) },
		});
	});

	return props.next({ ...props, sources });
};

export default setup;
