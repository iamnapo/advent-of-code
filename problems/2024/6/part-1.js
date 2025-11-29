import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const grid = [];
for await (const line of lines) grid.push(line);

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
for (let x = 0; x < grid.length; x++) {
	for (let y = 0; y < grid[x].length; y++) {
		if (Object.keys(directions).includes(grid[x][y])) {
			guardPos = [x, y];
			facing = grid[x][y];
			grid[x] = [...grid[x]];
			grid[x][y] = ".";
		}
	}
}

const visited = new Set([guardPos.join(",")]);

for (;;) {
	const [dx, dy] = directions[facing];
	const [nx, ny] = [guardPos[0] + dx, guardPos[1] + dy];

	if (nx < 0 || nx >= grid.length || ny < 0 || ny >= grid[0].length) {
		break;
	}

	if (grid[nx][ny] === "#") {
		facing = rightTurn[facing];
	} else {
		guardPos = [nx, ny];
		visited.add(guardPos.join(","));
	}
}

console.log(`Day 6 - Part 1 solution is: ${visited.size}`);
