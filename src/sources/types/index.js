import { fill, map } from '@laufire/utils/collection';
import typeDefaults from '../defaults/type';

import config from './config';

const types = {
	config,
};

const augmented = map(types, (type) => fill(type, typeDefaults));

export default augmented;
