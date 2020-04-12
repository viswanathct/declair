import { merge, map } from '@laufire/utils/collection';
import defaults from '../defaults';

/* Helpers */
const normalizeConfig = ({ config, normalize, type }) => {
	const { processors, normalize: typeNormalizer } = type;

	processors && map(processors, (processor, prop) =>
		(config[prop] = processor({
			prop: config[prop],
			config: config,
			normalize: normalize,
		})));

	typeNormalizer && typeNormalizer({ config, normalize });
};

const getNormalizer = (types) => {
	const normalize = (extensions) => {
		const typeName = extensions.type || defaults.type;
		const type = types[typeName];
		const config = merge(
			{}, type.config, extensions
		);

		normalizeConfig({
			config, normalize, type,
		});

		return config;
	};

	return normalize;
};

/* Exports */
const normalize = (context) => {
	const { structure, types } = context;

	context.structure = getNormalizer(types)(structure);
};

export default normalize;
