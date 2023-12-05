import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });
const numbersSpelledOut = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const calibrationValues = [];

for await (const line of lines) {
	let lineForA = line;
	for (let index = 0; index < line.length; index += 1) {
		for (const [number, spelledOutNumber] of numbersSpelledOut.entries()) {
			if (index === lineForA.indexOf(spelledOutNumber)) {
				lineForA = lineForA.replace(spelledOutNumber, number + 1);
			}
		}
	}

	const a = [...lineForA].find((c) => Number.isInteger(Number(c)));

	let lineForB = line;
	for (let index = line.length - 1; index >= 0; index -= 1) {
		for (const [number, spelledOutNumber] of numbersSpelledOut.entries()) {
			if (index === lineForB.lastIndexOf(spelledOutNumber)) {
				lineForB = lineForB.replace(spelledOutNumber, number + 1);
			}
		}
	}

	const b = [...lineForB].findLast((c) => Number.isInteger(Number(c)));

	calibrationValues.push(Number(`${a}${b}`));
}

console.log(`Day 1 - Part 2 solution is: ${calibrationValues.reduce((a, b) => a + b)}`);
