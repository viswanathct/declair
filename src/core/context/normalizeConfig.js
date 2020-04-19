import { merge, map, pick } from '@laufire/utils/collection';
import defaults from '../defaults';

/* Helpers */
const normalizeWorker = ({ config, normalize, type }) => {
	const { props, normalize: typeNormalizer } = type;
	const propNormalizers = pick(props, 'normalize');
	const normalizedProps = map(propNormalizers, (propNormalizer, prop) =>
		propNormalizer({
			prop: config[prop],
			config: config,
			normalize: normalize,
		}));

	merge(config, normalizedProps);

	typeNormalizer({ config, normalize });
};

const getNormalizer = (types) => {
	const normalize = (extensions) => {
		const typeName = extensions.type || defaults.type;
		const type = types[typeName];
		const config = merge(
			{}, pick(type.props, 'default'), extensions
		);

		normalizeWorker({
			config, normalize, type,
		});

		return config;
	};

	return normalize;
};

/* Exports */
const normalizeConfig = ({ config, context }) => {
	const normalize = getNormalizer(context.types);

	config.structure = normalize(config.structure);
	config.sources = map(config.sources,
		(source, name) => normalize({ ...source, name }));
};

export default normalizeConfig;
