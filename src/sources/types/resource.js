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
		const config = propResolver(props, configProps);
		const state = { config: {}, result: { loading: true }};
		const cb = (result) => {
			state.result = result;
			context.refreshState(name);
		};

		props.data = () => state.result;

		props.request = () => {
			if(patched(state.config, config())) {
				request(state.config, cb);
				return true;
			}
		};
	},
	setup: (props) => () => {
		if(!props.request())
			return props.data();
	},
	type: 'resource',
};

export default resource;
