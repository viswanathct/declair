import { doNothing } from '../../utils';
import { Platform } from 'react-native';
import { fill, map, merge } from '@laufire/utils/collection';

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
			? context.isObservable(parsing.inherited.data)
				&& parsing.inherited.data
			: undefined);

/* Exports */
const type = {
	props: {
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
			parse: (args) => {
				const { context, parsing, props, resolver } = args;
				const data = resolver(args);
				const parsingType = context.types[parsing.type];

				return parsing.target
					? parsingType.editable
						?	(dataIn) => (dataIn !== undefined
							? context.publish({ [props.target()]: dataIn })
							: data())
						: () => context.publish({ [props.target()]: data() })
					: data;
			},
		},
		item: {
			normalize: ({ normalize, prop, parsing }) =>
				(prop ? normalize(prop, { inherited: parsing }) : undefined),
			parse: ({ context, parse, prop }) =>
				(prop ? context.mount(parse({ parsing: prop })) : undefined),
		},
		items: {
			normalize: ({ prop, normalize }) =>
				(prop
					? map(prop, (item, name) => normalize({ name }, item))
					: undefined),
			parse: ({ prop, parse }) => {
				if(!prop)
					return undefined;

				const items = map(prop, (item) => parse({ parsing: item }));

				return () => items;
			},
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
				(context.types[parsing.type].interactive
					? prop || inferTarget({ context, parsing })
					: undefined),
			parse: ({ prop }) => () => prop,
		},
	},
	normalize: doNothing,
	parse: ({ props, inherited }) => {
		fill(props, inherited);
	},
	setup: doNothing,
};

export default type;
