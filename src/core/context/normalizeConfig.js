import { merge, map, pick } from '@laufire/utils/collection';
import defaults from '../defaults';

/* Helpers */
const normalizeWorker = ({ context, normalize, type }) => {
	const { props, normalize: typeNormalizer } = type;
	const propNormalizers = pick(props, 'normalize');
	const normalizedProps = map(propNormalizers, (propNormalizer, prop) =>
		propNormalizer({
			prop: context[prop],
			context: context,
			normalize: normalize,
		}));

	merge(context, normalizedProps);

	typeNormalizer({ context, normalize });
};

const getNormalizer = (types) => {
	const normalize = (extensions) => {
		const typeName = extensions.type || defaults.type;
		const type = types[typeName];
		const context = merge(
			{}, pick(type.props, 'default'), extensions
		);

		normalizeWorker({
			context, normalize, type,
		});

		return context;
	};

	return normalize;
};

/* Exports */
const normalizeConfig = ({ context }) => {
	const { structure, types } = context;

	context.structure = getNormalizer(types)(structure);
};

export default normalizeConfig;
