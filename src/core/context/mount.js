/* Exports */
const mount = (parsed) => {
	const component = parsed.type.setup(parsed.props);

	return (renderProps) => component({ ...parsed.props, ...renderProps });
};

export default mount;
