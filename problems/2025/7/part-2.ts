import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const grid = await readFile(new URL("input.txt", import.meta.url), "utf8").then((d) => d.trimEnd().split("\n"));

const S = { x: grid[0]!.indexOf("S"), y: 0 };

let currentTimelines = new Map([[S.x, 1]]);

let completedTimelinesCount = 0;

for (let y = 0; y < grid.length; y++) {
	const nextTimelines = new Map<number, number>();

	for (const [x, count] of currentTimelines) {
		const nextY = y + 1;
		if (nextY >= grid.length) {
			completedTimelinesCount += count;
			continue;
		}

		const cell = grid[nextY]![x];

		if (cell === "^") {
			for (const nextX of [x - 1, x + 1]) {
				if (nextX < 0 || nextX >= grid[0]!.length) {
					completedTimelinesCount += count;
				} else {
					nextTimelines.set(nextX, (nextTimelines.get(nextX) ?? 0) + count);
				}
			}
		} else {
			nextTimelines.set(x, (nextTimelines.get(x) ?? 0) + count);
		}
	}

	currentTimelines = nextTimelines;
}

completedTimelinesCount += [...currentTimelines.values()].reduce((a, b) => a + b, 0);

console.log(`Day 7 - Part 2 solution is: ${completedTimelinesCount}`);
