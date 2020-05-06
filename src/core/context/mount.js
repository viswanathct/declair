/* Exports */
const mount = (parsed) => (renderProps) => parsed.type.setup(parsed.props)({
	...renderProps,
	...parsed.props,
});

export default mount;
