import { Vec3, vec3 } from './utils';

export default {
	part1: (input: string): number => {
		let output = 0;

		let junctions = input
			.split('\n')
			.map((line) => line.split(',').map(Number))
			.map((v) => vec3(v[0], v[1], v[2]));

		let closestTable: [Vec3, Vec3, number][] = [];

		// Make table of closest junction boxes
		for (let j1 of junctions) {
			let closest: Vec3 = null!;
			let closestBy = Infinity;
			for (let j2 of junctions) {
				let distance = j1.distanceFast(j2);
				if (j1 != j2 && distance < closestBy) {
					closest = j2;
					closestBy = distance;
				}
			}
			closestTable.push([j1, closest, closestBy]);
		}

		closestTable.sort((a, b) => a[2] - b[2]);

		let graphs: Set<Vec3>[] = [];
		let i = 0;
		for (let [j1, j2] of closestTable) {
			if (i++ == 10) break;
			let graph = graphs.find((g) => g.has(j2));
			if (graph) {
				console.log([j1, j2]);

				graph.add(j1);
				continue;
			}
			graphs.push(new Set([j1, j2]));
		}

		console.log(closestTable.join('\n'));
		console.log(graphs);

		return output;
	},
	part2: (input: string): number => {
		let output = 0;
		return output;
	},
};
