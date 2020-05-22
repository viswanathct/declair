import getItemRenderers from '../parsers/items';

/* Exports */
const element = {
	setup: (parserArgs) => {
		const { render } = parserArgs.type;
		const items = getItemRenderers(parserArgs);

		return (props) => render({ ...props, items });
	},
};

export default element;
