import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const universe = [];
for await (const line of lines) {
	const row = [...line];
	if (row.every((cell) => cell === ".")) {
		universe.push(row);
	}

	universe.push(row);
}

for (let j = 0; j < universe[0].length; j += 1) {
	const column = universe.map((row) => row[j]);
	if (column.every((cell) => cell === ".")) {
		for (const row of universe) {
			row.splice(j, 0, ".");
		}

		j += 1;
	}
}

const galaxies = [];
for (let i = 0; i < universe.length; i++) {
	for (let j = 0; j < universe[0].length; j++) {
		if (universe[i][j] === "#") {
			galaxies.push({ x: i, y: j, id: galaxies.length + 1 });
		}
	}
}

let sum = 0;
const pairsCalculated = new Set();
for (const galaxy of galaxies) {
	for (const other of galaxies) {
		if (galaxy.id !== other.id && !pairsCalculated.has(`${galaxy.id}-${other.id}`) && !pairsCalculated.has(`${other.id}-${galaxy.id}`)) {
			pairsCalculated.add(`${galaxy.id}-${other.id}`);

			const x = Math.abs(galaxy.x - other.x);
			const y = Math.abs(galaxy.y - other.y);
			sum += x + y;
		}
	}
}

console.log(`Day 11 - Part 1 solution is: ${sum}`);
