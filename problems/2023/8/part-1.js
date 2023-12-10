import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const input = await readFile(new URL("input.txt", import.meta.url), "utf8");

const info = input.trimEnd().split("\n");

const navigationInstructions = [...info[0]];
const nodes = {};
for (const node of info.slice(2)) {
	const [name, lr] = node.split(" = ");
	nodes[name] = { L: lr.slice(1, 4), R: lr.slice(6, -1) };
}

let currentNode = nodes.AAA;
let stepCount = 0;

while (currentNode !== nodes.ZZZ) {
	const direction = navigationInstructions[stepCount % (navigationInstructions.length)];
	currentNode = nodes[currentNode[direction]];
	stepCount += 1;
}

console.log(`Day 8 - Part 1 solution is: ${stepCount}`);
