import { Grid, Vec2 } from './utils';

export default {
	part1: (input: string): number => {
		let output = 0;
		let grid = new Grid(input);

		grid.forEach((v, pos) => {
			if (v != '@') return;
			let adj = grid.getCardinal(pos);
			if (adj.filter((v) => v == '@').length < 4) output++;
		});

		return output;
	},
	part2: (input: string): number => {
		let output = 0;
		let grid = new Grid(input);
		let toRemove: Vec2[] = [];

		do {
			toRemove.forEach((vec) => grid.set(vec, '.'));
			output += toRemove.length;
			toRemove = [];

			grid.forEach((v, pos) => {
				if (v != '@') return;
				let adj = grid.getCardinal(pos);
				if (adj.filter((v) => v == '@').length < 4) toRemove.push(pos);
			});
		} while (toRemove.length > 0);

		return output;
	},
};
