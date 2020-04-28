import { map } from '@laufire/utils/collection';
import { resolver } from './resolve';

/* Helpers */
const parseWorker = (params) => {
	const { config, context, inherited: inheritedProps,
		parsing, parse, type } = params;
	const { name } = parsing;
	const props = map(type.props, (typeProp, propKey) => {
		const { parse: propParser } = typeProp;
		const prop = parsing[propKey];
		const inherited = inheritedProps[propKey];
		const propEvaluator = (propParser || resolver)({ config,
			context, inherited, name, prop, parse, parsing });

		return propEvaluator;
	});

	const parsed = { context, config, props, type };

	type.parse({ ...parsed,
		inherited: inheritedProps,
		parse: parse,
		parsing: parsing });

	return parsed;
};

/* Exports */
const getParser = ({ config, context }) => {
	const { types } = context;
	const parse = ({ parsing, inherited = {}}) => {
		const type = types[parsing.type];

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
