import { merge, map, pick } from '@laufire/utils/collection';

/* Helpers */
const parseWorker = ({ context, parse, type }) => {
	const { props, parse: typeParser } = type;
	const propParsers = pick(props, 'parse');
	const parsedProps = map(propParsers, (propParser, prop) =>
		context[prop] !== undefined && propParser({
			prop: context[prop],
			context: context,
			parse: parse,
		}));

	merge(context, parsedProps);

	return typeParser && typeParser({ context, parse });
};

const getParser = (types) => {
	const parse = (context) => {
		const type = types[context.type];

		parseWorker({
			context, parse, type,
		});

		return context;
	};

	return parse;
};

/* Exports */
const parseConfig = ({ context }) => {
	context.structure = getParser(context.types)(context.structure);
};

export default parseConfig;
