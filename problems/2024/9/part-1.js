import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { URL } from "node:url";

const lines = createInterface({ input: createReadStream(new URL("input.txt", import.meta.url)) });

let diskMap = "";
for await (const line of lines) diskMap += line;

const disk = [];
let currentFileID = 0;
let isFile = true;

for (const digit of diskMap) {
	const block = isFile ? currentFileID : ".";
	disk.push(...Array.from({ length: digit }, () => block));
	if (isFile) currentFileID += 1;
	isFile = !isFile;
}

for (;;) {
	const leftmostDotIndex = disk.indexOf(".");
	if (leftmostDotIndex === -1) break;

	let rightmostFileIndex = -1;
	for (let i = disk.length - 1; i > leftmostDotIndex; i--) {
		if (disk[i] !== ".") {
			rightmostFileIndex = i;
			break;
		}
	}

	if (rightmostFileIndex === -1) break;
	disk[leftmostDotIndex] = disk[rightmostFileIndex];
	disk[rightmostFileIndex] = ".";
}

const checksum = disk.reduce((acc, cur, i) => acc + (cur === "." ? 0 : cur * i), 0);

console.log(`Day 9 - Part 1 solution is: ${checksum}`);
