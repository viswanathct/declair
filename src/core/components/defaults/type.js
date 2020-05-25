import { Platform } from 'react-native';
import { fill, map, merge } from '@laufire/utils/collection';
import { doNothing, dataCall } from '../../utils';
import parseItems from '../parsers/items';

/* Data */
const { OS: platform } = Platform;

/* Helpers */
const getSourceActions = ({ context, parsing }) =>
	(context.isObservable(parsing.data)
	&& context.sources[parsing.data].props.actions
		&& (() => context.sources[parsing.data].props.actions))
	|| undefined;

const inferTarget = ({ context, parsing }) =>
	(context.isObservable(parsing.data)
		? parsing.data
		: parsing.inherited
			? context.isObservable(parsing.inherited.target)
				&& parsing.inherited.target
			: undefined);

const whenProp = (cb) => (args) => (args.prop !== undefined
	? cb(args)
	: undefined);

/* Exports */
const type = {
	simple: true,
	props: {
		action: {},
		actions: {
			parse: ({ context, parsing, prop }) =>
				(prop
					? () => prop
					: getSourceActions({ context, parsing })),
		},
		available: {
			default: true,
			parse: ({ prop }) => () => Boolean(prop),
		},
		data: {
			parse: whenProp((args) => dataCall(args)),
		},
		item: {
			normalize: whenProp(({ normalize, prop, parsing }) => {
				const { target = parsing.data } = parsing;

				return normalize(prop, { inherited: { target }});
			}),
			parse: whenProp(({ context, parse, prop }) =>
				context.mount(parse({ parsing: prop }))),
		},
		items: {
			normalize: whenProp(({ prop, normalize }) =>
				map(prop, (item, name) => normalize({ name }, item))),
			parse: whenProp((parserArgs) => {
				const items = parseItems(parserArgs);

				return () => items;
			}),
		},
		label: {
			normalize: ({ prop, parsing }) => prop || parsing.name,
		},
		platform: {
			default: {},
			normalize: ({ prop, parsing }) =>
				merge(parsing, prop[platform]) && undefined,
		},
		target: {
			normalize: ({ context, parsing, prop }) =>
				prop || inferTarget({ context, parsing }),
			// #TODO: Inferring target disallows empty targets. Figure, whether it's a valid use-case.
			parse: whenProp((args) => {
				const { context, prop } = args;

				return (dataIn) => context.publish({ [prop]: dataIn });
			}),
		},
	},
	normalize: doNothing,
	parse: ({ props, inherited }) => {
		fill(props, inherited);
	},
	setup: (setupArgs) => setupArgs.type.render,
};

export default type;
