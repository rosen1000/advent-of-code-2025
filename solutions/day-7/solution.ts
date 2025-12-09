import { Dir, Grid, Vec2, vec2 } from '@/utils';

export default {
	part1: (input: string): number => {
		let grid = new Grid(input);
		let startPos = vec2(-1, -1);
		for (let i = 0; i < grid.size.x; i++) {
			if (grid.get(vec2(0, i)) == 'S') {
				startPos = vec2(0, i);
				break;
			}
		}

		function traverse(pos: Vec2) {
			if (grid.get(pos) == '.') {
				traverse(pos.add(Dir.down));
			}
			if (grid.get(pos) == '^') {
				grid.set(pos, 'o'); // "remember" traversed position
				traverse(pos.add(Dir.downleft));
				traverse(pos.add(Dir.downright));
			}
		}

		traverse(startPos.add(Dir.down));
		return grid.count('o');
	},
	part2: (input: string): number => {
		let output = 0;

		let grid = new Grid<string | number>(input);

		grid.forEach((v, pos) => {
			if (v == '^') {
				let reverse = pos.add(Dir.up);
				let beams = 0;
				while (true) {
					let curr = grid.get(reverse);
					if (typeof curr == 'number') break;
					if (curr == null) break;
					if (curr == 'S') break;
					let a = +grid.get(reverse.add(Dir.left))!;
					let b = +grid.get(reverse.add(Dir.right))!;
					if (!isNaN(a)) beams += a;
					if (!isNaN(b)) beams += b;
					reverse = reverse.add(Dir.up);
				}
				if (grid.get(reverse) == 'S') beams++;
				grid.set(pos, beams);
			}
		});

		grid.forEach((v) => {
			if (typeof v == 'number') output += v;
		});

		return output + 1;
	},
};
