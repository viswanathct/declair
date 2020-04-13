import { merge, map, pick } from '@laufire/utils/collection';

/* Helpers */
const parseConfig = ({ context, parse, type }) => {
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

		parseConfig({
			context, parse, type,
		});

		return context;
	};

	return parse;
};

/* Exports */
const parse = ({ context }) => {
	context.structure = getParser(context.types)(context.structure);
};

export default parse;
