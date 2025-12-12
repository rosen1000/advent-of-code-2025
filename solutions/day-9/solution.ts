import { Dir, shapeGrid, Vec2, vec2 } from './utils';

export default {
	part1: (input: string): number => {
		let output = 0;

		let corners = input
			.split('\n')
			.map((line) => line.split(','))
			.map((line) => vec2(+line[0], +line[1]));

		function findArea(a: Vec2, b: Vec2) {
			return Math.abs(a.x - b.x + 1) * Math.abs(a.y - b.y + 1);
		}

		for (let a of corners) {
			for (let b of corners) {
				let area = findArea(a, b);
				if (area > output) output = area;
			}
		}

		return output;
	},
	part2: (input: string): number => {
		let output = 0;

		let corners = input
			.split('\n')
			.map((line) => line.split(','))
			.map((line) => vec2(+line[0], +line[1]));

		let maxX = corners.toSorted((a, b) => b.x - a.x)[0].x;
		let maxY = corners.toSorted((a, b) => b.y - a.y)[0].y;

		console.log(maxX, maxY);
		
		let grid = shapeGrid(maxX + 1, maxY + 1, '.');
		console.log(grid);
		corners.forEach((v) => grid.set(v, '#'));
		

		let current = corners[0];
		corners.push(current)
		for (let corner of corners) {
			let dir = corner.sub(current).normalize();
			while (!current.eq(corner)) {
				grid.set(current, '#');
				current = current.add(dir);
			}
		}

		console.log(corners);
		console.log(grid);

		return output;
	},
};
