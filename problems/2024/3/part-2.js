import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

let sum = 0;
let mulEnabled = true;

for await (const line of lines) {
	for (const [cmd, x, y] of line.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g)) {
		if (cmd === "do()") {
			mulEnabled = true;
		} else if (cmd === "don't()") {
			mulEnabled = false;
		} else if (mulEnabled && cmd.startsWith("mul")) {
			sum += Number(x) * Number(y);
		}
	}
}

console.log(`Day 3 - Part 2 solution is: ${sum}`);
