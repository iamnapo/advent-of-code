import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const ranges: [number, number][] = [];
let readingRanges = true;

let freshIngredientCount = 0;

for await (const line of lines) {
	if (!line) {
		readingRanges = false;
		continue;
	}

	if (readingRanges) {
		ranges.push(line.split("-").map(Number) as [number, number]);
	} else if (ranges.some(([min, max]) => min <= Number(line) && Number(line) <= max)) {
		freshIngredientCount += 1;
	}
}

console.log(`Day 5 - Part 1 solution is: ${freshIngredientCount}`);
