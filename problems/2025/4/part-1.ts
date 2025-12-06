import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const grid: string[][] = [];

for await (const line of lines) grid.push([...line]);

let accessibleRollCount = 0;

for (let row = 0; row < grid.length; row++) {
	for (let col = 0; col < grid[row]!.length; col++) {
		if (grid[row]![col] === "@") {
			let rollsAroundIt = 0;
			if (grid[row - 1]?.[col - 1] === "@") rollsAroundIt += 1;
			if (grid[row - 1]?.[col] === "@") rollsAroundIt += 1;
			if (grid[row - 1]?.[col + 1] === "@") rollsAroundIt += 1;
			if (grid[row]?.[col - 1] === "@") rollsAroundIt += 1;
			if (grid[row]?.[col + 1] === "@") rollsAroundIt += 1;
			if (grid[row + 1]?.[col - 1] === "@") rollsAroundIt += 1;
			if (grid[row + 1]?.[col] === "@") rollsAroundIt += 1;
			if (grid[row + 1]?.[col + 1] === "@") rollsAroundIt += 1;

			if (rollsAroundIt < 4) accessibleRollCount += 1;
		}
	}
}

console.log(`Day 4 - Part 1 solution is: ${accessibleRollCount}`);
