import types from './types';
import { map, filter, merge } from '@laufire/utils/collection';

/* Exports */
const setup = (props) => {
	const { publish, sources: sourceConfig,
		types: typeCustomizations } = props;
	const sourceTypes = filter(merge(
		{}, typeCustomizations, types
	),
	(type) => type.type === 'source',);
	const sources = map(sourceConfig, (source, name) => {
		const type = sourceTypes[source.type];

		return type.setup({
			publish: publish,
			source: { name, ...merge(
				{},
				{}, type.config, source
			) },
		});
	});

	const context = props.next({ ...props, sources });

	return { ...context, sources };
};

export default { setup };
