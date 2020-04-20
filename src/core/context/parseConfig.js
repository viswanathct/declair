import { filter, map, pick } from '@laufire/utils/collection';
import getResolver from './resolve';

/* Helpers */
const parseWorker = (params) => {
	let hasSource = false;
	const { config, context, parsing, parse, type } = params;
	const { name } = parsing;
	const parsable = filter(type.props, (typeProp) => typeProp.parse);

	const props = map(parsable, (typeProp, propKey) => {
		const { primitive, parse: propParser } = typeProp;
		const prop = parsing[propKey];
		const propEvaluator = propParser({ config, context, parsing, name,
			prop, parse });

		if(!primitive)
			return propEvaluator;

		const resolved = getResolver(
			config, context, prop, propEvaluator
		);

		hasSource = hasSource || resolved.hasSource;
		return resolved.resolver;
	});

	return type.parse({ context, config, hasSource, props, type });
};

/* Exports */
const getParser = ({ config, context }) => {
	const { types } = context;
	const parse = ({ parsing }) => {
		const type = types[parsing.type];

		return parseWorker({
			context, config, parsing, parse, type,
		});
	};

	return parse;
};

/* Exports */
const parseConfig = ({ config, context }) => {
	const parser = getParser({ config, context });

	context.sources = pick(map(config.sources,
		(source) => parser({ parsing: source })), 'props');
	context.structure = parser({ parsing: config.structure });
};

export default parseConfig;
