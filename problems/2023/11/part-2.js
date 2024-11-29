import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const universe = [];
for await (const line of lines) {
	universe.push([...line]);
}

const galaxies = [];
for (let i = 0; i < universe.length; i++) {
	for (let j = 0; j < universe[0].length; j++) {
		if (universe[i][j] === "#") {
			galaxies.push({ x: i, y: j, id: galaxies.length + 1 });
		}
	}
}

const expansion = 1e6;
const xExpansionAfter = new Map();
const yExpansionAfter = new Map();
for (const [i, row] of universe.entries()) {
	xExpansionAfter.set(i, (row.every((cell) => cell === ".") ? expansion : 1) - 1);
}

for (let j = 0; j < universe[0].length; j++) {
	const column = universe.map((row) => row[j]);
	yExpansionAfter.set(j, (column.every((cell) => cell === ".") ? expansion : 1) - 1);
}

let sum = 0;
const pairsCalculated = new Set();
for (const galaxy of galaxies) {
	for (const other of galaxies) {
		if (galaxy.id !== other.id && !pairsCalculated.has(`${galaxy.id}-${other.id}`) && !pairsCalculated.has(`${other.id}-${galaxy.id}`)) {
			pairsCalculated.add(`${galaxy.id}-${other.id}`);

			let x1 = galaxy.x;
			let y1 = galaxy.y;
			let x2 = other.x;
			let y2 = other.y;

			for (let i = 0; i < galaxy.x; i++) x1 += xExpansionAfter.get(i);
			for (let j = 0; j < galaxy.y; j++) y1 += yExpansionAfter.get(j);
			for (let i = 0; i < other.x; i++) x2 += xExpansionAfter.get(i);
			for (let j = 0; j < other.y; j++) y2 += yExpansionAfter.get(j);

			const x = Math.abs(x1 - x2);
			const y = Math.abs(y1 - y2);
			sum += x + y;
		}
	}
}

console.log(`Day 11 - Part 2 solution is: ${sum}`);
