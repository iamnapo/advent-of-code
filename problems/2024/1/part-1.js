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

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

let totalDistance = 0;
for (const [i, element] of leftList.entries()) {
	totalDistance += Math.abs(element - rightList[i]);
}

console.log(`Day 1 - Part 1 solution is: ${totalDistance}`);
