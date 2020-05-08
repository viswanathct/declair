import { map, clean } from '@laufire/utils/collection';
import { resolver } from './resolve';
import defaults from '../defaults';

/* Helpers */
const parseWorker = (params) => {
	const { config, context, inherited: inheritedProps,
		name, parsing, parse, type } = params;
	const parseArgs = { context, config, name, parsing, parse, resolver, type };

	const props = map(type.props, (typeProp, propKey) => {
		const { parse: propParser } = typeProp;
		const prop = parsing[propKey];
		const inherited = inheritedProps[propKey];
		const propEvaluator = context.isObservable(prop)
			? (data) => context.sources[prop](data)
			: (propParser || resolver)({ ...parseArgs, inherited, prop });

		return propEvaluator;
	});

	const parsed = { ...parseArgs, props: clean(props) };

	type.parse({ ...parsed,
		inherited: inheritedProps,
		parse: parse });

	return parsed;
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
