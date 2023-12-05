import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

let points = 0;

for await (const line of lines) {
	const [, numbers] = line.split(":");
	const winningNumbers = new Set(numbers.split("|")[0].split(" ").filter(Boolean).map(Number));
	const ourNumbers = numbers.split("|")[1].split(" ").filter(Boolean).map(Number);
	const winningCount = ourNumbers.filter((n) => winningNumbers.has(n)).length;
	if (winningCount) {
		points += 2 ** (winningCount - 1);
	}
}

console.log(`Day 4 - Part 1 solution is: ${points}`);
