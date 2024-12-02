import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const leftList = [];
const rightList = [];

for await (const line of lines) {
	const numbers = line.split(/\s+/).map(Number);
	leftList.push(numbers[0]);
	rightList.push(numbers[1]);
}

const rightFrequency = new Map();
for (const num of rightList) {
	rightFrequency.set(num, (rightFrequency.get(num) || 0) + 1);
}

let similarityScore = 0;
for (const num of leftList) {
	const frequency = rightFrequency.get(num) || 0;
	similarityScore += num * frequency;
}

console.log(`Day 1 - Part 2 solution is: ${similarityScore}`);
