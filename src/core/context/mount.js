/* Exports */
const mount = (parsed) => parsed.type.setup(parsed.props)(parsed.props);

export default mount;
