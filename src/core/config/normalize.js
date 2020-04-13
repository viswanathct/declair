import { merge, map, pick } from '@laufire/utils/collection';
import defaults from '../defaults';

/* Helpers */
const normalizeContext = ({ context, normalize, type }) => {
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

		normalizeContext({
			context, normalize, type,
		});

		return context;
	};

	return normalize;
};

/* Exports */
const normalize = ({ context }) => {
	const { structure, types } = context;

	context.structure = getNormalizer(types)(structure);
};

export default normalize;
