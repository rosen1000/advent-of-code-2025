import util from 'util';

export class Grid<T = string> {
	data: T[][];
	size: Vec2;

	constructor(data: string, parser: (v: string) => T = (v) => v as T) {
		this.data = data.split('\n').map((line) => line.split('').map(parser));
		this.size = new Vec2(this.data.length, this.data[0].length);
	}

	get(pos: Vec2): T | null {
		if (this.oob(pos)) return null;
		return this.data[pos.x][pos.y];
	}

	getRel(pos: Vec2, dir: Vec2): T | null {
		let npos = pos.add(dir);
		return this.get(npos);
	}

	/**
	 * Return array of cardinally adjecent positions
	 * ```txt
	 * 012
	 * 3x4
	 * 567
	 * ```
	 */
	getCardinal(pos: Vec2): (T | null)[] {
		let positions = [Dir.upleft, Dir.up, Dir.upright, Dir.left, Dir.right, Dir.downleft, Dir.down, Dir.downright];
		return positions.map((v) => this.getRel(pos, v));
	}

	/** @returns {boolean} True if setting was a success */
	set(pos: Vec2, val: T): boolean {
		if (this.oob(pos)) return false;
		this.data[pos.x][pos.y] = val;
		return true;
	}

	/**
	 * Out Of Bounds checker
	 */
	oob(pos: Vec2): boolean {
		return pos.x < 0 || pos.y < 0 || pos.x >= this.size.x || pos.y >= this.size.y;
	}

	count(val: T) {
		let c = 0;
		this.forEach((v) => {
			if (val == v) c++;
		});
		return c;
	}

	countF(checker: (val: T) => boolean) {
		let c = 0;
		this.forEach((v) => {
			if (checker(v)) c++;
		});
		return c;
	}

	forEach(iter: (value: T, pos: Vec2) => void) {
		for (let i = 0; i < this.size.x; i++) {
			for (let j = 0; j < this.size.y; j++) {
				let pos = new Vec2(i, j);
				iter(this.get(pos)!, pos);
			}
		}
	}

	[util.inspect.custom]() {
		return this.data.map((v) => v.join('')).join('\n');
	}
}

export function vec2(x: number, y: number) {
	return new Vec2(x, y);
}

export class Vec2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(vec: Vec2): Vec2 {
		return new Vec2(this.x + vec.x, this.y + vec.y);
	}

	sub(vec: Vec2): Vec2 {
		return new Vec2(this.x - vec.x, this.y - vec.y);
	}

	mul(val: number): Vec2 {
		return new Vec2(this.x * val, this.y * val);
	}

	eq(vec: Vec2): boolean {
		return this.x == vec.x && this.y == vec.y;
	}

	rotateRight(): Vec2 {
		return new Vec2(this.y, -this.x);
	}

	rotateLeft(): Vec2 {
		return new Vec2(-this.y, this.x);
	}

	toString() {
		return `[${this.x}, ${this.y}]`;
	}

	[util.inspect.custom]() {
		return `[${this.x}, ${this.y}]`;
	}
}

export function vec3(x: number, y: number, z: number) {
	return new Vec3(x, y, z);
}

export class Vec3 {
	constructor(public x: number, public y: number, public z: number) {}

	add(vec: Vec3): Vec3 {
		return new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
	}

	sub(vec: Vec3): Vec3 {
		return new Vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
	}

	/** Return the magnitude of distance, usefull for comparing */
	distanceFast(vec: Vec3): number {
		return Math.pow(vec.x - this.x, 2) + Math.pow(vec.y - this.y, 2) + Math.pow(vec.z - this.z, 2);
	}

	distance(vec: Vec3): number {
		return Math.sqrt(this.distanceFast(vec));
	}

	toString() {
		return `[${this.x}, ${this.y}, ${this.z}]`;
	}

	[util.inspect.custom]() {
		return `[${this.x}, ${this.y}, ${this.z}]`;
	}
}

export const Dir = {
	up: new Vec2(-1, 0),
	down: new Vec2(1, 0),
	left: new Vec2(0, -1),
	right: new Vec2(0, 1),
	upleft: new Vec2(-1, -1),
	upright: new Vec2(-1, 1),
	downleft: new Vec2(1, -1),
	downright: new Vec2(1, 1),
} as const;
