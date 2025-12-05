import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

let joltageSum = 0;

for await (const line of lines) {
	const banks = [...line].map(Number);
	const maxBank = Math.max(...banks.slice(0, -1));
	const secondMaxBank = Math.max(...banks.slice(banks.indexOf(maxBank) + 1));

	joltageSum += Number(`${maxBank}${secondMaxBank}`);
}

console.log(`Day 3 - Part 1 solution is: ${joltageSum}`);
