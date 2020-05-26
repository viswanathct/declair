import { fill, map } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import collection from './collection';
import resource from './resource';
import transformation from './transformation';
import value from './value';

const types = {
	collection,
	resource,
	transformation,
	value,
};

const augmented = map(types, (type) => fill(type, typeDefaults));

export default augmented;
