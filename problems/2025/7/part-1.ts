import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const grid = await readFile(new URL("input.txt", import.meta.url), "utf8").then((d) => d.trimEnd().split("\n"));

const S = { x: grid[0]!.indexOf("S"), y: 0 };

const queue = [S];
const visited = new Set([`${S.x},${S.y}`]);

let splitCount = 0;

while (queue.length > 0) {
	const { x, y } = queue.shift()!;

	const nextY = y + 1;
	if (nextY >= grid.length) continue;

	const nextKey = `${x},${nextY}`;
	if (visited.has(nextKey)) continue;
	visited.add(nextKey);

	const cell = grid[nextY]![x];

	if (cell === "^") {
		splitCount += 1;

		for (const nextX of [x - 1, x + 1]) {
			if (nextX < 0 || nextX >= grid[0]!.length) {
				splitCount += 1;
			} else {
				const newKey = `${nextX},${nextY}`;
				if (!visited.has(newKey)) {
					visited.add(newKey);
					queue.push({ x: nextX, y: nextY });
				}
			}
		}
	} else {
		queue.push({ x, y: nextY });
	}
}

console.log(`Day 7 - Part 1 solution is: ${splitCount}`);
