// import declair from 'declair/quick';

// NOTE: Tests are skipped due to a lack of knowledge in setting up the environment.

/* Tests */
describe('the package', () => {
	test.skip('the setup returns a Root and the sources', () => {
		const { Root, sources } = declair({
			types: {
				element: {
					config: {
						style: typeStyles.element,
					},
				},
			},
			sources: {
				simple: {
					type: 'config',
					value: messages[i],
				},
			},
		});

		expect(Root).toEqual(Root);
		expect(sources).toEqual(sources);
	});
});
