export default {
	part1: (input: string): number => {
		let output = 0;
		let splits = input.split('\n\n');
		let fresh = splits[0].split('\n').map((v) => v.split('-').map(Number)) as [number, number][];
		let ids = splits[1].split('\n').map(Number);

		loop: for (let id of ids) {
			for (let f of fresh) {
				if (f[0] <= id && id <= f[1]) {
					output++;
					continue loop;
				}
			}
		}
		return output;
	},
	part2: (input: string): number => {
		let output = 0;
		let fresh = input
			.split('\n\n')[0]
			.split('\n')
			.map((v) => v.split('-').map(Number)) as [number, number][];

		let optimzed: [number, number][] = [];
		loop: for (let f of fresh) {
			for (let o of optimzed) {
				// Extend backwards
				if (f[0] < o[0] && f[1] >= o[0] && f[1] <= o[1]) {
					o[0] = f[0];
					continue loop
				}
				// Extend forwards
				if (f[1] > o[1] && f[0] >= o[0] && f[0] <= o[1]) {
					o[1] = f[1]
					continue loop
				}
			}
			optimzed.push(f)
		}

		console.log(optimzed);
		

		return output;
	},
};
