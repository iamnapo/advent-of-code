import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const calibrationValues = [];

for await (const line of lines) {
	const lineCharacters = [...line];
	const a = lineCharacters.find((c) => Number.isInteger(Number(c))) ?? 0;
	const b = lineCharacters.findLast((c) => Number.isInteger(Number(c))) ?? 0;
	calibrationValues.push(Number(`${a}${b}`));
}

console.log(`Day 1 - Part 1 solution is: ${calibrationValues.reduce((a, b) => a + b)}`);
