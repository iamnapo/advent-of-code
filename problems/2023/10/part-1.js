import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const pipeTypes = {
	"|": ["N", "S"],
	"-": ["W", "E"],
	L: ["N", "E"],
	J: ["N", "W"],
	7: ["S", "W"],
	F: ["S", "E"],
	S: ["N", "S", "W", "E"],
};

const directions = {
	N: [-1, 0, "S"],
	S: [1, 0, "N"],
	W: [0, -1, "E"],
	E: [0, 1, "W"],
};

const map = [];
for await (const line of lines) {
	map.push([...line]);
}

let start;
for (const [i, row] of map.entries()) {
	for (const [j, tile] of row.entries()) {
		if (tile === "S") {
			start = [i, j];
			break;
		}
	}
}

const visitedTiles = new Set();
const distances = [];
const loop = [[start, 0]];

for (let i = 0; i < loop.length; i++) {
	const [[ci, cj], distance] = loop[i];
	const tileId = `${ci}|${cj}`;

	if (!visitedTiles.has(tileId)) {
		visitedTiles.add(tileId);
		distances.push(distance);

		for (const direction of pipeTypes[map[ci][cj]]) {
			const [di, dj, opposite] = directions[direction];
			const newI = ci + di;
			const newJ = cj + dj;
			const isInBounds = newI >= 0 && newI < map.length && newJ >= 0 && newJ < map[newI].length;

			if (isInBounds && pipeTypes[map[newI][newJ]].includes(opposite)) {
				loop.push([[newI, newJ], distance + 1]);
			}
		}
	}
}

console.log(`Day 10 - Part 1 solution is: ${Math.max(...distances)}`);
