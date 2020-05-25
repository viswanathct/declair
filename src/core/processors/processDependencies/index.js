import { map, select, traverse, keys } from '@laufire/utils/collection';
import { unique } from '../../utils';
import getDependents from './dependencies';

/* Helpers */
const buildDependencyMap = ({ config, context }) =>
	getDependents(map(config.sources, (source) => {
		const type = context.types[source.type];
		const dependencies = [];

		traverse(select(source, type.props), (value) =>
			context.isObservable(value) && dependencies.push(value));

		return unique(dependencies);
	}));

const orderDependencies = (dependencyMap) => {
	const sources = keys(dependencyMap);
	let cursor = 0;

	while(cursor < sources.length) {
		const source = sources[cursor];
		const dependencies = dependencyMap[source];
		const depMaxPos = Math.max(...dependencies.map((dependency) =>
			sources.indexOf(dependency)));

		if(cursor < depMaxPos) {
			sources.splice(cursor, 1);
			sources.splice(
				depMaxPos, 0, source
			);
		}
		else
			cursor++;
	}

	return sources.reverse();
};

/* Exports */
const processDependencies = ({ config, context }) => {
	const dependencyMap = buildDependencyMap({ config, context });
	const dependencyOrder = orderDependencies(dependencyMap);
	const orderedDependencyMap = select(dependencyMap, dependencyOrder);
	const orderedSources = select(config.sources, dependencyOrder);

	config.sources = orderedSources;
	context.dependencyMap = orderedDependencyMap;
};

export default processDependencies;
