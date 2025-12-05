import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

let joltageSum = 0;

for await (const line of lines) {
	let banks = [...line].map(Number);
	let joltage = "";
	for (let i = 11; i > 0; i--) {
		const maxBank = Math.max(...banks.slice(0, -i));
		banks = banks.slice(banks.indexOf(maxBank) + 1);
		joltage += maxBank;
	}

	joltage += Math.max(...banks);

	joltageSum += Number(joltage);
}

console.log(`Day 3 - Part 2 solution is: ${joltageSum}`);
