import { fill, map } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import value from './value';
import transformation from './transformation';

const types = {
	value,
	transformation,
};

const augmented = map(types, (type) => fill(type, typeDefaults));

export default augmented;
