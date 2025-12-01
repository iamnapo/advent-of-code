import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

let dial = 50;
let timesAtOrCrossedZero = 0;

for await (const line of lines) {
	const direction = line[0];
	const distance = Number(line.slice(1));

	const current = dial;

	dial += direction === "L" ? -distance : distance;

	const offset = direction === "L" ? -1 : 0;
	timesAtOrCrossedZero += Math.abs(Math.floor((dial + offset) / 100) - Math.floor((current + offset) / 100));
}

console.log(`Day 1 - Part 2 solution is: ${timesAtOrCrossedZero}`);
