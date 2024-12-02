import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

let safeCount = 0;

const isSafe = (levels) => {
	let isIncreasing = true;
	let isDecreasing = true;

	for (let i = 1; i < levels.length; i++) {
		const diff = levels[i] - levels[i - 1];

		if (diff === 0 || Math.abs(diff) > 3) {
			return false;
		}

		if (diff > 0) isDecreasing = false;
		if (diff < 0) isIncreasing = false;
	}

	return isIncreasing || isDecreasing;
};

function isSafeWithDampener(levels) {
	if (isSafe(levels)) return true;

	for (let i = 0; i < levels.length; i++) {
		if (isSafe(levels.toSpliced(i, 1))) return true;
	}

	return false;
}

for await (const line of lines) {
	const levels = line.split(/\s+/).map(Number);
	if (isSafeWithDampener(levels)) {
		safeCount += 1;
	}
}

console.log(`Day 2 - Part 2 solution is: ${safeCount}`);
