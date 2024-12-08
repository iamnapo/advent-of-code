import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const map = [];
for await (const line of lines) map.push(line);

const rows = map.length;
const cols = map[0].length;

const antennaPositions = new Map();
for (let x = 0; x < rows; x++) {
	for (let y = 0; y < cols; y++) {
		const ch = map[x][y];
		if (ch !== ".") {
			if (!antennaPositions.has(ch)) antennaPositions.set(ch, []);
			antennaPositions.get(ch).push({ x, y });
		}
	}
}

const antinodes = new Set();

for (const positions of antennaPositions.values()) {
	for (const { x, y } of positions) antinodes.add(`${x},${y}`);

	for (const [i, position] of positions.entries()) {
		for (const otherPosition of positions.slice(i + 1)) {
			const { x: x1, y: y1 } = position;
			const { x: x2, y: y2 } = otherPosition;
			const dx = x2 - x1;
			const dy = y2 - y1;

			for (let cx = x1 - dx, cy = y1 - dy; cx >= 0 && cx < rows && cy >= 0 && cy < cols; cx -= dx, cy -= dy) {
				antinodes.add(`${cx},${cy}`);
			}

			for (let cx = x2 + dx, cy = y2 + dy; cx >= 0 && cx < rows && cy >= 0 && cy < cols; cx += dx, cy += dy) {
				antinodes.add(`${cx},${cy}`);
			}
		}
	}
}

console.log(`Day 8 - Part 2 solution is: ${antinodes.size}`);
