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

for (let fileID = currentFileID - 1; fileID >= 0; fileID--) {
	const fileStart = disk.indexOf(fileID);
	const fileEnd = disk.lastIndexOf(fileID);
	if (fileStart !== -1 && fileEnd !== -1) {
		const fileLength = fileEnd - fileStart + 1;

		let bestSpanStart = -1;
		let runStart = -1;
		let runLength = 0;

		for (let i = 0; i < fileStart; i++) {
			if (disk[i] === ".") {
				if (runStart === -1) runStart = i;
				runLength += 1;
			} else {
				if (runLength >= fileLength) {
					bestSpanStart = runStart;
					break;
				}

				runStart = -1;
				runLength = 0;
			}
		}

		if (runLength >= fileLength && bestSpanStart === -1) {
			bestSpanStart = runStart;
		}

		if (bestSpanStart !== -1) {
			for (let i = fileStart; i <= fileEnd; i++) disk[i] = ".";
			for (let i = bestSpanStart; i < bestSpanStart + fileLength; i++) disk[i] = fileID;
		}
	}
}

const checksum = disk.reduce((acc, cur, i) => acc + (cur === "." ? 0 : cur * i), 0);

console.log(`Day 9 - Part 2 solution is: ${checksum}`);
