import { copyFileSync, existsSync, mkdirSync } from 'fs';
import solution from './solution';

process.argv.splice(0, 2);
let args = process.argv;
let config = await Bun.file('./config.json').json();
let input = '';

switch (args[0]?.toLowerCase()) {
	case 'set':
		config[args[1]] = args[2];
		Bun.write('./config.json', JSON.stringify(config));
		console.log('Updated config');
		break;
	case 'run':
		input = await Bun.file(`./solutions/day-${config.day}/input.txt`).text();
		console.log(solution[`part${args[1]}` as 'part1' | 'part2'](input.trimEnd()));
		break;
	case 'test':
		input = await Bun.file('./test.txt').text();
		console.log(solution[`part${args[1]}` as 'part1' | 'part2'](input.trimEnd()));
		break;
	case 'input':
		fetch(`https://adventofcode.com/${config.year}/day/${config.day}/input`, {
			headers: { Cookie: `session=${process.env.SESSION};` },
		})
			.then((res) => res.text())
			.then(async (data) => {
				if (!existsSync('./solutions')) mkdirSync(`./solutions`);
				if (!existsSync(`./solutions/day-${config.day}`)) mkdirSync(`./solutions/day-${config.day}`);
				Bun.write(`./solutions/day-${config.day}/input.txt`, data.trim());
			})
			.catch(console.error);
		break;
	case 'save':
		if (!existsSync('./solutions')) mkdirSync(`./solutions`);
		if (!existsSync(`./solutions/day-${config.day}`)) mkdirSync(`./solutions/day-${config.day}`);
		copyFileSync(`./solution.ts`, `./solutions/day-${config.day}/solution.ts`);
		console.log('Done');
		break;
	case 'clear':
	case 'reset':
		Bun.write(
			'./solution.ts',
			`export default {
	part1: (input: string): number => {
		let output = 0;
		return output;
	},
	part2: (input: string): number => {
		let output = 0;
		return output;
	},
};
`
		);
		Bun.write('./test.txt', '');
		console.log('Done');
		break;
	case 'load':
		copyFileSync(`./solutions/day-${config.day}/solution.ts`, './solution.ts');
		console.log('Done');
		break;
	default:
		console.log(`Usage:
    set [key] [value] - set config variables
    run [part_number] - run solution
    save - save solution to a folder
    load [day] - load solution from day
    clear - resets solution file`);
}
