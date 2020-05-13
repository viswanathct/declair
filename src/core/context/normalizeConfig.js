import { merge, map, pick, sanitize } from '@laufire/utils/collection';
import defaults from '../defaults';

/* Helpers */
const normalizeWorker = ({ config, context, normalize, parsing, type }) => {
	parsing.type = type.type;
	const { props, normalize: typeNormalizer } = type;
	const propNormalizers = pick(props, 'normalize');
	const parseProps = { config, parsing, context, normalize };
	const normalizedProps = map(propNormalizers, (propNormalizer, prop) =>
		propNormalizer({
			...parseProps,
			prop: parsing[prop],
		}));

	merge(parsing, normalizedProps);

	typeNormalizer({ parsing, normalize });
};

const getNormalizer = ({ config, context }) => {
	const { types } = context;
	const normalize = (...extensions) => {
		const merged = merge(...extensions);
		const typeName = merged.type || defaults.type;
		const type = types[typeName];
		const parsing = merge(
			{}, pick(type.props, 'default'), merged
		);

		normalizeWorker({
			config, context, normalize, parsing, type,
		});

		return parsing;
	};

	return normalize;
};

/* Exports */
const normalizeConfig = ({ config, context }) => {
	const normalize = getNormalizer({ config, context });

	config.structure = sanitize(normalize({ name: 'app' }, config.structure));
	config.sources = sanitize(map(config.sources,
		(source, name) => normalize({ ...source, name })));
};

export default normalizeConfig;
