import { map, filter } from '@laufire/utils/collection';
import getResolver from './resolve';

/* Helpers */
const parseWorker = (params) => {
	let hasSource = false;
	const { context, config, parse, type } = params;
	const parsable = filter(type.props, (typeProp) => typeProp.parse);

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

	return type.parse({ hasSource, props, type });
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
const parseConfig = ({ config, context }) => {
	context.structure = getParser(context)({ config: config.structure });
};

export default parseConfig;
