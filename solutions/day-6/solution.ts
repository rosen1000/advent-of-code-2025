export default {
	part1: (input: string): number => {
		let output = 0;

		let sheet = input.split('\n').map((v) =>
			v
				.split(' ')
				.map((v) => v.trim())
				.filter((v) => v)
		);
		let ops = sheet.pop()!;
		let nums = sheet.map((v) => v.map(Number));

		for (let i = 0; i < ops.length; i++) {
			let step = ops[i] == '+' ? 0 : 1;
			for (let j = 0; j < nums.length; j++) {
				if (ops[i] == '+') {
					step += nums[j][i];
				} else {
					step *= nums[j][i];
				}
			}
			output += step;
		}

		return output;
	},
	part2: (input: string): number => {
		let output = 0;

		let nums = input.split('\n');
		let ops = nums.pop()!;

		let sum = (a: number, b: number) => a + b;
		let mul = (a: number, b: number) => a * b;

		let op = ops[0] == '+' ? sum : mul;
		let temp = ops[0] == '+' ? 0 : 1;

		for (let i = 0; i < nums[0].length; i++) {
			let step = '';
			for (let j = 0; j < nums.length; j++) {
				step += nums[j][i];
			}

			if (+step == 0) {
				output += temp;
				op = ops[i + 1] == '+' ? sum : mul;
				temp = ops[i + 1] == '+' ? 0 : 1;
			} else {
				temp = op(temp, +step);
			}
		}
		output += temp;

		return output;
	},
};
