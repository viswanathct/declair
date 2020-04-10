import types from './types';
import { collect, filter, merge } from '@laufire/utils/collection';

/* Exports */
const setup = (props) => {
	const { publish, sources: sourceConfig,
		types: typeCustomizations } = props;
	const sourceTypes = filter(merge(typeCustomizations, types),
		(type) => type.type === 'source',);
	const sources = collect(sourceConfig, (source, name) => {
		const type = sourceTypes[source.type];

		return type.handler({
			publish: publish,
			source: { name, ...merge(
				{}, type.config, source
			) },
		});
	});

	const context = props.next({ ...props, sources });

	return {
		...context,
		sources,
	};
};

export default setup;
