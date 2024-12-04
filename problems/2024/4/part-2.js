import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const grid = [];
for await (const line of lines) grid.push(line);

const patterns = [
	[
		[-1, -1, "M"],
		[-1, 1, "S"],
		[0, 0, "A"],
		[1, -1, "M"],
		[1, 1, "S"],
	],
	[
		[-1, -1, "S"],
		[-1, 1, "M"],
		[0, 0, "A"],
		[1, -1, "S"],
		[1, 1, "M"],
	],
	[
		[-1, -1, "M"],
		[-1, 1, "M"],
		[0, 0, "A"],
		[1, -1, "S"],
		[1, 1, "S"],
	],
	[
		[-1, -1, "S"],
		[-1, 1, "S"],
		[0, 0, "A"],
		[1, -1, "M"],
		[1, 1, "M"],
	],
];

let totalCount = 0;

const areWeHappy = (x, y, pattern) => pattern.every(([dx, dy, char]) => grid[x + dx]?.[y + dy] === char);

for (let x = 0; x < grid.length; x++) {
	for (let y = 0; y < grid[0].length; y++) {
		for (const pattern of patterns) {
			if (areWeHappy(x, y, pattern)) totalCount += 1;
		}
	}
}

console.log(`Day 4 - Part 2 solution is: ${totalCount}`);
