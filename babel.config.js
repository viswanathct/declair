module.exports = (api) => {
	api.cache(false);
	return {
		plugins: [
			['@babel/plugin-transform-runtime',
				{
					regenerator: true,
				}],
			['@babel/plugin-proposal-class-properties'],
		],
		presets: [
			'@babel/preset-env',
			'@babel/preset-react',
		],
	};
};
