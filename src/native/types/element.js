import { merge } from '@laufire/utils/collection';
import container from './shared/container';

/* Exports */
const element = merge(
	{}, container, {
		props: {
			style: {
				default: {
					flexDirection: 'row',
				},
			},
		},
	}
);

export default element;
