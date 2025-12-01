export class Grid {
	data: number[][];
	size: Vec2;

	constructor(data: string) {
		this.data = data.split('\n').map((line) => line.split('').map(Number));
		this.size = new Vec2(this.data.length, this.data[0].length);
	}

	get(pos: Vec2): number | null {
		if (this.oob(pos)) return null;
		return this.data[pos.x][pos.y];
	}

	getAdj(pos: Vec2, dir: Vec2): number | null {
		let npos = pos.add(dir);
		return this.get(npos);
	}

	/** @returns {boolean} True if setting was a success */
	set(pos: Vec2, val: number): boolean {
		if (this.oob(pos)) return false;
		this.data[pos.x][pos.y] = val;
		return true;
	}

	oob(pos: Vec2): boolean {
		return pos.x < 0 || pos.y < 0 || pos.x >= this.size.x || pos.y >= this.size.y;
	}

	forEach(iter: (value: number, pos: Vec2) => void) {
		for (let i = 0; i < this.size.x; i++) {
			for (let j = 0; j < this.size.y; j++) {
				let pos = new Vec2(i, j);
				iter(this.get(pos)!, pos);
			}
		}
	}
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
}

export const Dir = {
	up: new Vec2(-1, 0),
	down: new Vec2(1, 0),
	left: new Vec2(0, -1),
	right: new Vec2(0, 1),
} as const;
