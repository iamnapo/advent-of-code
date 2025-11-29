import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

const histories = [];
for await (const line of lines) {
	histories.push(line.split(" ").map(Number).toReversed());
}

const predictedValues = [];

for (const history of histories) {
	let currentRow = [...history];
	const lastNumberInEachRow = [currentRow.at(-1)];
	while (currentRow.some(Boolean)) {
		const tempRow = [];
		for (let i = 1; i < currentRow.length; i += 1) {
			tempRow.push(currentRow[i] - currentRow[i - 1]);
		}

		currentRow = tempRow;
		lastNumberInEachRow.push(currentRow.at(-1));
	}

	predictedValues.push(lastNumberInEachRow.reduce((a, b) => a + b, 0));
}

console.log(`Day 9 - Part 2 solution is: ${predictedValues.reduce((a, b) => a + b, 0)}`);
