export default {
	part1: (input: string): number => {
		let output = 0;
		let ranges = input.split(',').map((v) => v.split('-').map(Number));
		for (let range of ranges) {
			for (let i = range[0]; i <= range[1]; i++) {
				let str = `${i}`;
				if (str.slice(0, str.length / 2) == str.slice(str.length / 2)) {
					output += i;
					console.log(`Found ${i}`);
				}
			}
		}
		return output;
	},
	part2: (input: string): number => {
		let output = 0;
		let ranges = input.split(',').map((v) => v.split('-').map(Number));
		for (let range of ranges) {
			for (let i = range[0]; i <= range[1]; i++) {
				let str = `${i}`;
				for (let j = 1; j < Math.ceil(str.length / 2 + 1); j++) {
					let seq = str.slice(0, j);
					if (str.length > 1 && !str.replaceAll(seq, '.').match(/[0-9]/)) {
						output += i;
						console.log(`Found ${i}`);
						break;
					}
				}
			}
		}
		return output;
	},
};

// 6:36
// 6:46 p1 done
// 6:57 p2 done
