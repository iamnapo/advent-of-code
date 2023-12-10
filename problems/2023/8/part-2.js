import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const input = await readFile(new URL("input.txt", import.meta.url), "utf8");
const info = input.trimEnd().split("\n");

const navigationInstructions = [...info[0]];
const nodes = [];
for (const node of info.slice(2)) {
	const [name, lr] = node.split(" = ");
	nodes.push({ name, L: lr.slice(1, 4), R: lr.slice(6, -1) });
}

const nodesEndingA = nodes.filter((n) => n.name.endsWith("A"));
const stepCounts = [];

for (const nodeEndingA of nodesEndingA) {
	let currentNode = nodeEndingA;
	let stepCount = 0;
	while (!currentNode.name.endsWith("Z")) {
		const direction = navigationInstructions[stepCount % (navigationInstructions.length)];
		currentNode = nodes.find((n) => n.name === currentNode[direction]); // eslint-disable-line no-loop-func

		stepCount += 1;
	}

	stepCounts.push(stepCount);
}

const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const lcm = (a, b) => (a * b) / gcd(a, b);

console.log(`Day 8 - Part 2 solution is: ${stepCounts.reduce(lcm)}`);
