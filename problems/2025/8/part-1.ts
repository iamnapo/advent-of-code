import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const points: [number, number, number][] = [];

for await (const line of lines) {
	points.push(line.split(",").map(Number) as [number, number, number]);
}

const connections = points
	.flatMap((A, i) =>
		points.slice(i + 1).map((B, j) => ({
			fromIndex: i,
			toIndex: i + j + 1,
			deanDan: (A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2 + (A[2] - B[2]) ** 2,
		})))
	.toSorted((a, b) => a.deanDan - b.deanDan);

const parent = Array.from({ length: points.length }, (_, i) => i);
const size = Array.from({ length: points.length }).fill(1) as number[];
const findRoot = (i: number): number => (parent[i] === i ? i : findRoot(parent[i]!));

for (const { fromIndex, toIndex } of connections.slice(0, 1000)) {
	const rootA = findRoot(fromIndex);
	const rootB = findRoot(toIndex);

	if (rootA !== rootB) {
		parent[rootA] = rootB;
		size[rootB]! += size[rootA]!;
	}
}

const finalSizes = [...new Set(points.map((_, i) => findRoot(i)))]
	.map((root) => size[root]!)
	.toSorted((a, b) => b - a)
	.slice(0, 3);

console.log(`Day 8 - Part 1 solution is: ${finalSizes.reduce((a, b) => a * b, 1)}`);
