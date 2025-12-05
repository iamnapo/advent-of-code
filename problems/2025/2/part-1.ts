import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const input = await readFile(new URL("input.txt", import.meta.url), "utf8");
const idRanges = input.trimEnd().split(",");

let invalidsSum = 0;

const regex = /^(.+)\1$/;

for (const idRange of idRanges) {
	const [start, end] = idRange.split("-").map(Number) as [number, number];
	for (let id = start; id <= end; id++) {
		if (regex.test(String(id))) {
			invalidsSum += id;
		}
	}
}

console.log(`Day 2 - Part 1 solution is: ${invalidsSum}`);
