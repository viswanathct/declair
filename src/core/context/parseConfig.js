import { map, filter } from '@laufire/utils/collection';
import getResolver from './resolve';

/* Helpers */
const parseWorker = (params) => {
	let hasSource = false;
	const { context, config, parse, type } = params;
	const { props: typeProps, parse: typeParser } = type;
	const parsable = filter(typeProps, (typeProp) => typeProp.parse);

	const props = map(parsable, (typeProp, propKey) => {
		const { primitive, parse: propParser } = typeProp;
		const prop = config[propKey];
		const propEvaluator = propParser({ context, config, prop, parse });

		if(!primitive)
			return propEvaluator;

		const resolved = getResolver(
			context, prop, propEvaluator
		);

		hasSource = hasSource || resolved.hasSource;
		return resolved.resolver;
	});

	return typeParser({ hasSource, props, type });
};

/* Exports */
const getParser = (context) => {
	const { types } = context;
	const parse = ({ config }) => {
		const type = types[config.type];

		return parseWorker({
			context, config, parse, type,
		});
	};

	return parse;
};

/* Exports */
const parseConfig = ({ context }) => {
	context.parsed = getParser(context)({ config: context.structure });
};

export default parseConfig;
