import { merge, map } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import element from './element';
import text from './text';
import input from './input';

const types = {
	element,
	input,
	text,
};

// TODO: Use fill, instead of merge.
const augmented = map(types, (type) => merge(
	{}, typeDefaults, type
));

export default augmented;
