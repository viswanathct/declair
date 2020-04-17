import { merge, map } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import element from './element';
import text from './text';

const types = {
	element,
	text,
};

// TODO: Use fill, instead of merge.
const augmented = map(types, (type) => merge(
	{}, typeDefaults, type
));

export default augmented;
