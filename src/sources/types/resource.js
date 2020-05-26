/**
 * A type to access remote resources.
 *
 * #NOTE: JSON is the only supported type, to ensure standard interfaces.
 */

import { equals, merge, fill, clean } from '@laufire/utils/collection';

/* Data */
const defaultConfig = {
	opts: {
		method: 'GET',
		headers: {},
	},
};

/* Helpers */
const request = async (config, cb) => {
	const response = await (await fetch(config.url, config.opts)).json();

	cb({ data: response });
};

const getConfig = (parserArgs) => {
	const { parsing } = parserArgs;

	return fill(clean({
		url: parsing.url,
		opts: parsing.opts,
	}), defaultConfig);
};

const getState = (parserArgs) => ({
	config: getConfig(parserArgs),
	result: {},
});

/* Exports */
const resource = {
	simple: false,
	props: {
		url: {},
	},
	parse: (parserArgs) => { // eslint-disable-line max-lines-per-function
		const { context, name, props } = parserArgs;
		const state = getState(parserArgs);
		const cb = (result) => {
			state.result = result;
			context.updateState({
				[name]: state.result,
			});
		};
		const data = () => state.result;
		const lazyData = () => {
			props.data = data;
			request(state.config, cb);

			return data();
		};

		props.data = lazyData;

		props.request = (config) => {
			if(!equals(config, state.config)) {
				merge(state.config, config);

				request(state.config, cb);
			}
		};
	},
	setup: (props) => (config) => {
		config !== undefined && props.request(config);

		return props.data();
	},
	type: 'resource',
};

export default resource;
