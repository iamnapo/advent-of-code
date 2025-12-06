import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const ranges: [number, number][] = [];

for await (const line of lines) {
	if (!line) break;
	ranges.push(line.split("-").map(Number) as [number, number]);
}

ranges.sort((a, b) => a[0] - b[0]);

const mergedRanges = [ranges[0]!];

for (let i = 1; i < ranges.length; i++) {
	const [start, end] = ranges[i]!;
	if (start <= mergedRanges.at(-1)![1]) {
		mergedRanges.at(-1)![1] = Math.max(mergedRanges.at(-1)![1], end);
	} else {
		mergedRanges.push([start, end]);
	}
}

const freshIngredientCount = mergedRanges.reduce((sum, [start, end]) => sum + (end - start + 1), 0);

console.log(`Day 5 - Part 2 solution is: ${freshIngredientCount}`);
