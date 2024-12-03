import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

let sum = 0;

for await (const line of lines) {
	for (const [_, x, y] of line.matchAll(/mul\((\d+),(\d+)\)/g)) {
		sum += Number(x) * Number(y);
	}
}

console.log(`Day 3 - Part 1 solution is: ${sum}`);
