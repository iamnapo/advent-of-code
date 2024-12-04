import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const grid = [];
for await (const line of lines) grid.push(line);

const directions = [
	[0, 1],
	[1, 0],
	[1, 1],
	[1, -1],
	[0, -1],
	[-1, 0],
	[-1, -1],
	[-1, 1],
];

let totalCount = 0;

const areWeHappy = (x, y, dx, dy) => ["X", "M", "A", "S"].every((char, i) => grid[x + i * dx]?.[y + i * dy] === char);

for (let x = 0; x < grid.length; x++) {
	for (let y = 0; y < grid[0].length; y++) {
		for (const [dx, dy] of directions) {
			if (areWeHappy(x, y, dx, dy)) totalCount += 1;
		}
	}
}

console.log(`Day 4 - Part 1 solution is: ${totalCount}`);
