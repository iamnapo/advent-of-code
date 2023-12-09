import { readFile } from "node:fs/promises";
import { URL } from "node:url";

const input = await readFile(new URL("input.txt", import.meta.url), "utf8");

const info = input.split("\n");
const times = info[0].match(/\d+/g).map(Number);
const distances = info[1].match(/\d+/g).map(Number);
const races = times.map((time, i) => ({ time, distance: distances[i] }));

let product = 1;

for (const { time, distance } of races) {
	let waysToWin = 0;
	for (let chargeTime = 0; chargeTime < time; chargeTime++) {
		const travelledDistance = (time - chargeTime) * chargeTime;
		if (travelledDistance > distance) waysToWin += 1;
	}

	product *= waysToWin;
}

console.log(`Day 6 - Part 1 solution is: ${product}`);
