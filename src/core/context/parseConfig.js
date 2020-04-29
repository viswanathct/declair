import { map } from '@laufire/utils/collection';
import { resolver } from './resolve';
import defaults from '../defaults';

/* Helpers */
const parseWorker = (params) => {
	const { config, context, inherited: inheritedProps,
		parsing, parse, type } = params;
	const props = map(type.props, (typeProp, propKey) => {
		const { parse: propParser } = typeProp;
		const prop = parsing[propKey];
		const inherited = inheritedProps[propKey];
		const propEvaluator = (propParser || resolver)({ config,
			context, inherited, prop, parse, parsing });

		return propEvaluator;
	});

	const parsed = { context, config, props, parsing, type };

	type.parse({ ...parsed,
		inherited: inheritedProps,
		parse: parse });

	return parsed;
};

/* Exports */
const getParser = ({ config, context }) => {
	const { types } = context;
	const parse = ({ parsing, inherited = {}}) => {
		const type = types[parsing.type || defaults.type];

		return parseWorker({
			context, config, inherited, parsing, parse, type,
		});
	};

	return parse;
};

/* Exports */
const parseConfig = ({ config, context }) => {
	const parser = getParser({ config, context });

	context.sources = map(config.sources,
		(source) => parser({ parsing: source }));
	context.structure = parser({ parsing: config.structure });
};

export default parseConfig;
