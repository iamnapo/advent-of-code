import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

let safeCount = 0;

for await (const line of lines) {
	const levels = line.split(/\s+/).map(Number);

	let isIncreasing = true;
	let isDecreasing = true;

	for (let i = 1; i < levels.length; i++) {
		const diff = levels[i] - levels[i - 1];

		if (diff === 0 || Math.abs(diff) > 3) {
			isIncreasing = false;
			isDecreasing = false;
			break;
		}

		if (diff > 0) isDecreasing = false;
		if (diff < 0) isIncreasing = false;
	}

	if (isIncreasing || isDecreasing) {
		safeCount += 1;
	}
}

console.log(`Day 2 - Part 1 solution is: ${safeCount}`);
