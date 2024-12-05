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

const sortUpdate = (update) => {
	const graph = new Map();
	const inDegree = new Map();

	for (const page of update) {
		graph.set(page, []);
		inDegree.set(page, 0);
	}

	for (const [x, y] of rules) {
		if (graph.has(x) && graph.has(y)) {
			graph.get(x).push(y);
			inDegree.set(y, inDegree.get(y) + 1);
		}
	}

	const queue = [];
	for (const [page, degree] of inDegree.entries()) {
		if (degree === 0) queue.push(page);
	}

	const sorted = [];
	while (queue.length > 0) {
		const current = queue.shift();
		sorted.push(current);

		for (const neighbor of graph.get(current)) {
			inDegree.set(neighbor, inDegree.get(neighbor) - 1);
			if (inDegree.get(neighbor) === 0) {
				queue.push(neighbor);
			}
		}
	}

	return sorted;
};

let totalMiddleSum = 0;

for (const update of updates) {
	if (!isValidUpdate(update)) {
		const sortedUpdate = sortUpdate(update);
		const middleIndex = Math.floor(sortedUpdate.length / 2);
		totalMiddleSum += sortedUpdate[middleIndex];
	}
}

console.log(`Day 5 - Part 2 solution is: ${totalMiddleSum}`);
