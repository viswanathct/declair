import { namedWrapper } from '../utils';

/* Exports */
const mount = (parsed) => {
	const component = parsed.type.setup(parsed);

	return namedWrapper((renderProps) =>
		component({ ...parsed.props, ...renderProps }), parsed);
};

export default mount;
