/**
 * A simple source that publishes the given config.
 */

const config = ({ source, publish }) => {
	const parsed = {
		update: (value) => publish({ [source.name]: value }),
	};

	typeof source.value !== 'undefined' && parsed.update(source.value);

	return parsed;
};

export default config;
