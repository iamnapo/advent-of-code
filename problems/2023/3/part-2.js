import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const symbols = new Set();
const schematic = [];
const symbolIdRatio = {};

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

		if (num) {
			if (symbols.has(row[rowI - num.length - 1]) && row[rowI - num.length - 1] === "*") {
				const id = `${i}/${rowI - num.length - 1}`;
				symbolIdRatio[id] ||= [];
				symbolIdRatio[id].push(Number(num));
			}

			if (symbols.has(row[rowI]) && row[rowI] === "*") {
				const id = `${i}/${rowI}`;
				symbolIdRatio[id] ||= [];
				symbolIdRatio[id].push(Number(num));
			}

			const leftOffset = Math.abs(Math.max(rowI - num.length - 1, 0));

			for (const [i2, c] of (schematic[i - 1] || []).slice(leftOffset, rowI + 1).entries()) {
				if (symbols.has(c) && c === "*") {
					const id = `${i - 1}/${i2 + leftOffset}`;
					symbolIdRatio[id] ||= [];
					symbolIdRatio[id].push(Number(num));
				}
			}

			for (const [i2, c] of (schematic[i + 1] || []).slice(leftOffset, rowI + 1).entries()) {
				if (symbols.has(c) && c === "*") {
					const id = `${i + 1}/${i2 + leftOffset}`;
					symbolIdRatio[id] ||= [];
					symbolIdRatio[id].push(Number(num));
				}
			}
		}
	}
}

let sum = 0;
for (const parts of Object.values(symbolIdRatio)) {
	if (parts.length > 1) {
		sum += parts.reduce((a, b) => a * b, 1);
	}
}

console.log(`Day 3 - Part 2 solution is: ${sum}`);
