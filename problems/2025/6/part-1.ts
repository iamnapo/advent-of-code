import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const worksheet = await readFile(new URL("input.txt", import.meta.url), "utf8").then((data) =>
	data.trimEnd().split("\n"));

const num1 = worksheet[0]!.split(" ").filter(Boolean).map(Number);
const num2 = worksheet[1]!.split(" ").filter(Boolean).map(Number);
const num3 = worksheet[2]!.split(" ").filter(Boolean).map(Number);
const num4 = worksheet[3]!.split(" ").filter(Boolean).map(Number);
const ops = worksheet[4]!.split(" ").filter(Boolean);

let sumOfAnswers = 0;

for (const [i, op] of ops.entries()) {
	sumOfAnswers += op === "+" ? num1[i]! + num2[i]! + num3[i]! + num4[i]! : num1[i]! * num2[i]! * num3[i]! * num4[i]!;
}

console.log(`Day 6 - Part 1 solution is: ${sumOfAnswers}`);
