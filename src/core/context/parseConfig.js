import { map, pick } from '@laufire/utils/collection';
import getResolver from './resolve';

/* Helpers */
const parseWorker = (params) => {
	const { context, config, parse, type } = params;
	const { props: typeProps, parse: typeParser } = type;
	const propParsers = pick(typeProps, 'parse');
	let hasSource = false;
	const props = map(propParsers, (propParser, propKey) => {
		const prop = config[propKey];
		const propEvaluator = propParser({
			context, config, prop, parse,
		});
		const resolved = getResolver(
			context, prop, propEvaluator
		);

		hasSource = hasSource || resolved.hasSource;

		return resolved.resolver;
	});

	return typeParser({ hasSource, props, type });
};

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
