import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const worksheet = await readFile(new URL("input.txt", import.meta.url), "utf8").then((data) =>
	data.trimEnd().split("\n"));

const num1 = [...worksheet[0]!].filter(Boolean);
const num2 = [...worksheet[1]!].filter(Boolean);
const num3 = [...worksheet[2]!].filter(Boolean);
const num4 = [...worksheet[3]!].filter(Boolean);
const ops = worksheet[4]!.split(" ").filter(Boolean);

let sumOfAnswers = 0;

for (const op of ops) {
	const maxLen = Math.max(0, num1.indexOf(" "), num2.indexOf(" "), num3.indexOf(" "), num4.indexOf(" "));

	const removed1 = num1.splice(0, maxLen);
	const removed2 = num2.splice(0, maxLen);
	const removed3 = num3.splice(0, maxLen);
	const removed4 = num4.splice(0, maxLen);

	const actualNumbers = [];

	if (maxLen > 0) {
		for (let j = 0; j < maxLen; j++) {
			actualNumbers.push(Number(`${removed1[j]}${removed2[j]}${removed3[j]}${removed4[j]}`));
		}

		num1.splice(0, 1);
		num2.splice(0, 1);
		num3.splice(0, 1);
		num4.splice(0, 1);
	} else {
		for (let j = 0; j < Math.max(num1.length, num2.length, num3.length, num4.length); j++) {
			actualNumbers.push(Number(`${num1[j] ?? ""}${num2[j] ?? ""}${num3[j] ?? ""}${num4[j] ?? ""}`));
		}
	}

	let answer = op === "+" ? 0 : 1;
	for (const n of actualNumbers) {
		answer = op === "+" ? answer + n : answer * n;
	}

	sumOfAnswers += answer;
}

console.log(`Day 6 - Part 2 solution is: ${sumOfAnswers}`);
