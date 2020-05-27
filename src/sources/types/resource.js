/**
 * A type to access remote resources.
 *
 * #NOTE: JSON is the only supported type, to ensure standard interfaces.
 */

import { select } from '@laufire/utils/collection';
import { patched, propResolver } from '../../core/utils';
import { url } from '../../core/utils/request';

/* Data */
const optProps = {
	params: {},
	method: {
		default: 'GET',
	},
	body: {},
	headers: {
		default: {},
	},
};
const configProps = {
	url: {},
	...optProps,
};

const httpErrorStart = 400;

/* Helpers */
const request = async (config, cb) => {
	cb({ loading: true });

	const response = await fetch(url(config), select(config, optProps));
	const key = response.status < httpErrorStart ? 'data' : 'error';

	cb({
		loading: false,
		[key]: await response.json(),
	});
};

/* Exports */
const resource = {
	simple: false,
	props: configProps,
	parse: (parserArgs) => {
		const { context, name, props } = parserArgs;
		const config = propResolver(parserArgs.props, configProps);
		const state = { config: {}, result: {}};
		const cb = (result) => {
			state.result = result;
			context.updateState({ [name]: state.result });
		};
		const lazyData = () => {
			props.data = () => state.result;
			request(state.config, cb);

			return state.result;
		};

		props.data = lazyData;

		props.request = () => {
			if(patched(state.config, config()))
				request(state.config, cb);
		};
	},
	setup: (props) => () => {
		props.request();

		return props.data();
	},
	type: 'resource',
};

export default resource;
