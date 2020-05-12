import { merge, map, pick, sanitize } from '@laufire/utils/collection';
import defaults from '../defaults';

/* Helpers */
const normalizeWorker = ({ config, context, normalize, type }) => {
	config.type = type.type;
	const { props, normalize: typeNormalizer } = type;
	const propNormalizers = pick(props, 'normalize');
	const normalizedProps = map(propNormalizers, (propNormalizer, prop) =>
		propNormalizer({
			prop: config[prop],
			config: config,
			context: context,
			normalize: normalize,
		}));

	merge(config, normalizedProps);

	typeNormalizer({ config, normalize });
};

const getNormalizer = (context) => {
	const { types } = context;
	const normalize = (extensions) => {
		const typeName = extensions.type || defaults.type;
		const type = types[typeName];
		const config = merge(
			{}, pick(type.props, 'default'), extensions
		);

		normalizeWorker({
			config, context, normalize, type,
		});

		return config;
	};

	return normalize;
};

/* Exports */
const normalizeConfig = ({ config, context }) => {
	const normalize = getNormalizer(context);

	config.structure = sanitize(normalize(config.structure));
	config.sources = sanitize(map(config.sources,
		(source, name) => normalize({ ...source, name })));
};

export default normalizeConfig;
