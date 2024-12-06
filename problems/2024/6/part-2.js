import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const grid = [];
for await (const line of lines) grid.push([...line]);

const directions = {
	"^": [-1, 0],
	">": [0, 1],
	v: [1, 0],
	"<": [0, -1],
};

const rightTurn = {
	"^": ">",
	">": "v",
	v: "<",
	"<": "^",
};

let guardPos;
let facing;

for (const [x, element] of grid.entries()) {
	for (let y = 0; y < element.length; y++) {
		if (Object.keys(directions).includes(element[y])) {
			guardPos = [x, y];
			facing = element[y];
			element[y] = ".";
		}
	}
}

const simulateGuard = (notGrid, startPos, startFacing) => {
	const visited = new Set();
	let pos = [...startPos];
	let direction = startFacing;

	for (;;) {
		const state = `${pos[0]},${pos[1]},${direction}`;
		if (visited.has(state)) return true;
		visited.add(state);

		const [dx, dy] = directions[direction];
		const [nx, ny] = [pos[0] + dx, pos[1] + dy];

		if (nx < 0 || nx >= notGrid.length || ny < 0 || ny >= notGrid[0].length) {
			return false;
		}

		if (notGrid[nx][ny] === "#") {
			direction = rightTurn[direction];
		} else {
			pos = [nx, ny];
		}
	}
};

let obstructionCount = 0;

for (let x = 0; x < grid.length; x++) {
	for (let y = 0; y < grid[x].length; y++) {
		if (grid[x][y] === "." && !(x === guardPos[0] && y === guardPos[1])) {
			grid[x][y] = "#";
			if (simulateGuard(grid, guardPos, facing)) {
				obstructionCount += 1;
			}

			grid[x][y] = ".";
		}
	}
}

console.log(`Day 6 - Part 2 solution is: ${obstructionCount}`);
