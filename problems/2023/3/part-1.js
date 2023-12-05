import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const symbols = new Set();
const schematic = [];
let sum = 0;

for await (const line of lines) {
	const lineCharacters = [...line];
	const lineSymbols = lineCharacters.filter((c) => !Number.isInteger(Number(c)) && c !== ".");
	schematic.push(lineCharacters);
	if (lineSymbols.length > 0) {
		symbols.add(...lineSymbols);
	}
}

for (const [i, row] of schematic.entries()) {
	for (let rowI = 0; rowI < row.length; rowI++) {
		let num = "";
		while (Number.isInteger(Number(row[rowI]))) {
			num += row[rowI];
			rowI += 1;
		}

		if (num && (
			symbols.has(row[rowI - num.length - 1]) // Left
			|| symbols.has(row[rowI]) // Right
			|| schematic[i - 1]?.slice(Math.max(rowI - num.length - 1, 0), rowI + 1).some((c) => symbols.has(c)) // Top
			|| schematic[i + 1]?.slice(Math.max(rowI - num.length - 1, 0), rowI + 1).some((c) => symbols.has(c)) // Bottom
		)) {
			sum += Number(num);
		}
	}
}

console.log(`Day 3 - Part 1 solution is: ${sum}`);
