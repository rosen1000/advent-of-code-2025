export default {
	part1: (input: string): number => {
		let output = 0;
		let banks = input.split('\n');
		for (let bank of banks) {
			let a = 0;
			let b = 0;
			for (let i in bank.split('')) {
				let battery = bank[i];
				if (+battery > a && +i != bank.length - 1) {
					a = +battery;
					b = 0;
					continue;
				}
				if (+battery > b) {
					b = +battery;
				}
			}
			console.log(`⚡️ ${a}${b} from ${bank}`);
			output += +`${a}${b}`;
		}
		return output;
	},
	part2: (input: string): number => {
		let output = 0;
		let banks = input.split('\n');

		for (let _bank of banks) {
			let bank = _bank.split('');
			let pos = 0;

			// while (bank.length > 12) {
			do {
				// console.log(1, bank.join(''), pos);
				if (bank[pos] < bank[pos + 1]) {
					bank[pos] = bank[pos + 1];
					bank.splice(pos + 1, 1);
					pos = 0;
					continue;
				}
				if (pos == 12) bank.splice(11, 1);
				if (pos < 12) pos++;
				console.log(2, bank.join(''), pos);
			} while (bank.length > 12);

			console.log(`⚡️ ${bank.join('')} (${_bank})`);
			output += +bank.join('');
		}

		return output;
	},
};

// 8:28
// 8:37 part1
// 94992791119788 too low p2
// 172981362045098 too low p2
