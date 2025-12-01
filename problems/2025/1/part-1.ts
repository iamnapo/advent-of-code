import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

let dial = 50;
let timesAtZero = 0;

for await (const line of lines) {
	const direction = line[0];
	const distance = Number(line.slice(1));

	dial += direction === "L" ? -distance : distance;

	dial = ((dial % 100) + 100) % 100;

	if (dial === 0) timesAtZero += 1;
}

console.log(`Day 1 - Part 1 solution is: ${timesAtZero}`);
