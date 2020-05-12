import { assign, clean, map } from '@laufire/utils/collection';
import { resolver } from './resolve';
import defaults from '../defaults';

/* Helpers */
const parseWorker = (params) => {
	const { inherited, parsing, type } = params;
	const props = {};
	const parseArgs = { ...params, props, resolver };

	assign(props, clean(map(type.props, (typeProp, propKey) => {
		const { parse: propParser } = typeProp;
		const prop = parsing[propKey];
		const inheritedProp = inherited[propKey];
		const propEvaluator = (propParser || resolver)({
			...parseArgs, inherited: inheritedProp, prop: prop,
		});

		return propEvaluator;
	})));

	type.parse({ ...parseArgs });

	return parseArgs;
};

/* Exports */
const getParser = ({ config, context }) => {
	const { types } = context;
	const parse = ({ parsing, inherited = {}, name, root }) => {
		const type = types[parsing.type || defaults.type];

		const parsed = parseWorker({
			context, config, inherited, name, parsing, parse, type,
		});

		root && (root[name] = parsed);

		return parsed;
	};

	return parse;
};

/* Exports */
const parseConfig = ({ config, context }) => {
	const parser = getParser({ config, context });

	map(config.sources,
		(source, name) => parser({
			parsing: source,
			name: name,
			root: context.sources,
		}));
	context.structure = parser({ parsing: config.structure });
};

export default parseConfig;
