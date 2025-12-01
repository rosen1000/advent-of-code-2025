export default {
	part1: (input: string): number => {
		let lines = input.split('\n');
		let position = 50;
		let output = 0;
		for (let line of lines) {
			let rotation = line[0];
			console.log(position, line);
			let steps = +line.slice(1);
			if (rotation == 'R') {
				position += steps;
				while (position > 99) position -= 100;
			} else if (rotation == 'L') {
				position -= steps;
				while (position < 0) position += 100;
			}
			if (position == 0) output++;
		}
		return output;
	},
	part2: (input: string): number => {
		let lines = input.split('\n');
		let position = 50;
		let output = 0;

		for (let line of lines) {
			let rotation = line[0];
			let steps = +line.slice(1);

			if (rotation == 'R') {
				position += steps;
				while (position > 99) {
					position -= 100;
					if (position != 0) output++;
				}
			} else if (rotation == 'L') {
				// Crazy edge case
				if (position == 0) output--;
				position -= steps;
				while (position < 0) {
					if (position != 0) output++;
					position += 100;
				}
			}
			if (position == 0) output++;
		}
		return output;
	},
};
