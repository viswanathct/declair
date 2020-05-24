import { dataExtractor } from '../../utils';

/* Exports */
const element = {
	setup: (parserArgs) => {
		const { render } = parserArgs.type;
		const extract = dataExtractor(parserArgs);

		return (props) => {
			const data = () => extract(props.data);
			const { target } = props;

			return render({ ...props, data, target });
		};
	},
};

export default element;
