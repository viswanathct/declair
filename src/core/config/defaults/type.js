import { doNothing } from '../../utils';
import { Platform } from 'react-native';
import { fill, map, merge } from '@laufire/utils/collection';

/* Data */
const { OS: platform } = Platform;

const getSourceActions = ({ context, parsing }) =>
	(context.isObservable(parsing.data)
	&& context.sources[parsing.data].props.actions
		&& (() => context.sources[parsing.data].props.actions))
	|| undefined;

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
			normalize: ({ prop, normalize }) =>
				(prop ? normalize(prop) : undefined),
			parse: ({ parse, prop }) =>
				(prop ? parse({ parsing: prop }) : undefined),
		},
		items: {
			default: {},
			normalize: ({ prop, normalize }) => map(prop, normalize),
		},
		platform: {
			default: {},
			normalize: ({ prop, config }) =>
				merge(config, prop[platform]) && undefined,
		},
		target: {
			normalize: ({ config, context, prop }) =>
				(context.types[config.type].interactive
					? prop
						? prop
						: context.isObservable(config.data)
							? config.data
							: undefined
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
