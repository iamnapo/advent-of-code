import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const rules = [];
const updates = [];
let switchedSection = false;

for await (const line of lines) {
	if (!line) {
		switchedSection = true;
	} else if (switchedSection) {
		updates.push(line.split(",").map(Number));
	} else {
		rules.push(line.split("|").map(Number));
	}
}

const isValidUpdate = (update) => {
	const indexMap = new Map();
	for (const [index, page] of update.entries()) indexMap.set(page, index);

	for (const [x, y] of rules) {
		if (indexMap.has(x) && indexMap.has(y) && indexMap.get(x) > indexMap.get(y)) {
			return false;
		}
	}

	return true;
};

let totalMiddleSum = 0;

for (const update of updates) {
	if (isValidUpdate(update)) {
		const middleIndex = Math.floor(update.length / 2);
		totalMiddleSum += update[middleIndex];
	}
}

console.log(`Day 5 - Part 1 solution is: ${totalMiddleSum}`);
